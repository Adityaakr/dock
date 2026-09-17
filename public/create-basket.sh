#!/usr/bin/env bash
# PolyBaskets: create a basket on Vara mainnet from one command.
#
#   curl -fsSL https://docs.polybaskets.xyz/create-basket.sh | bash -s -- \
#     --name "BTC Strength Sep 18" \
#     --desc "Bitcoin holds above 74k into the Sep 18 close" \
#     --legs "4470871:YES:4000,4470875:YES:3500,4470877:YES:2500"
#
# legs = <polymarket numeric market id>:<YES|NO>:<weight in basis points>, comma separated.
# Weights must sum to 10000. Slug and end date are fetched from Polymarket, so the
# assistant only has to get the market ids and sides right.
#
# Needs: node 18+ with npm, curl, jq. Installs vara-wallet if missing. Gas is paid by
# the PolyBaskets voucher backend; the wallet never needs VARA of its own.
set -euo pipefail

NAME=""; DESC=""; LEGS=""; WALLET="agent"
while [ $# -gt 0 ]; do
  case "$1" in
    --name) NAME="$2"; shift 2 ;;
    --desc) DESC="$2"; shift 2 ;;
    --legs) LEGS="$2"; shift 2 ;;
    --wallet) WALLET="$2"; shift 2 ;;
    *) echo "unknown argument: $1" >&2; exit 2 ;;
  esac
done
[ -n "$NAME" ] && [ -n "$LEGS" ] || { echo "usage: --name <name> [--desc <text>] --legs id:YES|NO:bps,..." >&2; exit 2; }

BASKET_MARKET="0xa749ccd80d71637b450789e12e3d94524e9ae17877d1b59f5ddda784f89a2cba"
BET_TOKEN="0x186f6cda18fea13d9fc5969eec5a379220d6726f64c1d5f4b346e89271f917bc"
BET_LANE="0x35848dea0ab64f283497deaff93b12fe4d17649624b2cd5149f253ef372b29dc"
VOUCHER_URL="https://voucher-backend-production-5a1b.up.railway.app/voucher"
IDL_URL="https://docs.polybaskets.xyz/idl/polymarket-mirror.idl"

step() { printf '\n\033[1m==> %s\033[0m\n' "$*"; }

step "Checking tools"
for t in node npm curl jq; do command -v "$t" >/dev/null || { echo "missing: $t (install it and rerun)" >&2; exit 1; }; done
if ! command -v vara-wallet >/dev/null; then
  echo "installing vara-wallet"; npm install -g vara-wallet@latest >/dev/null
fi
vara-wallet config set network mainnet >/dev/null

step "Wallet: $WALLET"
if ! vara-wallet wallet list | jq -e --arg w "$WALLET" '.[] | select(.name == $w)' >/dev/null; then
  vara-wallet wallet create --name "$WALLET" --no-encrypt >/dev/null
  echo "created wallet $WALLET (unencrypted, gas is sponsored; back it up if you keep it)"
fi
MY_ADDR=$(vara-wallet balance --account "$WALLET" | jq -r .address)
[ -n "$MY_ADDR" ] && [ "$MY_ADDR" != "null" ] || { echo "could not read wallet address" >&2; exit 1; }
echo "address $MY_ADDR"

step "Gas voucher"
STATE=$(curl -fsS "$VOUCHER_URL/$MY_ADDR")
VOUCHER_ID=$(echo "$STATE" | jq -r .voucherId)
if [ "$VOUCHER_ID" = "null" ]; then
  RESP=$(curl -sS -w '\n%{http_code}' -X POST "$VOUCHER_URL" -H 'Content-Type: application/json' \
    -d "{\"account\":\"$MY_ADDR\",\"programs\":[\"$BASKET_MARKET\",\"$BET_TOKEN\",\"$BET_LANE\"]}")
  CODE=$(echo "$RESP" | tail -n1); BODY=$(echo "$RESP" | sed '$d')
  case "$CODE" in
    200|201) VOUCHER_ID=$(echo "$BODY" | jq -r .voucherId) ;;
    429) VOUCHER_ID=$(echo "$STATE" | jq -r .voucherId) ;;
    *) echo "voucher request failed: HTTP $CODE $BODY" >&2; exit 1 ;;
  esac
fi
[ -n "$VOUCHER_ID" ] && [ "$VOUCHER_ID" != "null" ] || { echo "no voucher available" >&2; exit 1; }
echo "voucher $VOUCHER_ID"

step "Contract interface"
WORK=$(mktemp -d); IDL="$WORK/polymarket-mirror.idl"
curl -fsS -o "$IDL" "$IDL_URL"

step "Resolving markets from Polymarket"
NOW_MS=$(node -e 'console.log(Date.now())')
ITEMS="[]"; TOTAL=0; SUMMARY=""
IFS=',' read -ra LEG_ARR <<< "$LEGS"
for leg in "${LEG_ARR[@]}"; do
  leg=$(echo "$leg" | tr -d ' ')
  ID=${leg%%:*}; REST=${leg#*:}; SIDE=$(echo "${REST%%:*}" | tr '[:lower:]' '[:upper:]'); BPS=${REST#*:}
  [[ "$ID" =~ ^[0-9]+$ ]] || { echo "bad market id in '$leg'" >&2; exit 1; }
  [ "$SIDE" = "YES" ] || [ "$SIDE" = "NO" ] || { echo "side must be YES or NO in '$leg'" >&2; exit 1; }
  [[ "$BPS" =~ ^[0-9]+$ ]] || { echo "weight must be an integer (basis points) in '$leg'" >&2; exit 1; }
  M=$(curl -fsS "https://gamma-api.polymarket.com/markets/$ID")
  SLUG=$(echo "$M" | jq -r .slug); Q=$(echo "$M" | jq -r .question); END=$(echo "$M" | jq -r .endDate)
  [ "$SLUG" != "null" ] && [ "$END" != "null" ] || { echo "market $ID not found on Polymarket" >&2; exit 1; }
  END_MS=$(node -e 'console.log(Date.parse(process.argv[1]))' "$END")
  [ "$END_MS" -gt $((NOW_MS + 600000)) ] || { echo "market $ID ends too soon ($END); pick another" >&2; exit 1; }
  ITEMS=$(echo "$ITEMS" | jq --arg id "$ID" --arg slug "$SLUG" --argjson bps "$BPS" --arg side "$SIDE" --argjson end "$END_MS" \
    '. + [{poly_market_id:$id, poly_slug:$slug, weight_bps:$bps, selected_outcome:$side, end_timestamp:$end}]')
  TOTAL=$((TOTAL + BPS))
  SUMMARY="$SUMMARY  $SIDE  $((BPS / 100))%  $Q\n"
done
[ "$TOTAL" -eq 10000 ] || { echo "weights sum to $TOTAL bps, must be exactly 10000" >&2; exit 1; }
printf "%b" "$SUMMARY"

step "Asset kind"
KIND=$(vara-wallet call "$BASKET_MARKET" BasketMarket/IsVaraEnabled --args '[]' --idl "$IDL" | jq -r '.result' | grep -q true && echo Vara || echo Bet)
echo "$KIND"

step "Creating basket on Vara mainnet"
ARGS=$(jq -cn --arg n "$NAME" --arg d "$DESC" --argjson items "$ITEMS" --arg k "$KIND" '[$n, $d, $items, $k]')
OUT=$(vara-wallet --account "$WALLET" call "$BASKET_MARKET" BasketMarket/CreateBasket --voucher "$VOUCHER_ID" --idl "$IDL" --args "$ARGS")
BASKET_ID=$(echo "$OUT" | jq -r '.result // empty')
TX=$(echo "$OUT" | jq -r '.txHash // empty')
[ -n "$BASKET_ID" ] || { echo "creation failed:" >&2; echo "$OUT" >&2; exit 1; }

printf '\n\033[1mBasket %s created.\033[0m\n' "$BASKET_ID"
echo "name    $NAME"
echo "tx      $TX"
echo "link    https://app.polybaskets.xyz/basket/$BASKET_ID"
echo
echo "Open the link, connect your Vara wallet, and place your position."
