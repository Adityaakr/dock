#!/usr/bin/env bash
# PolyBaskets: create a basket on Vara mainnet from one command.
#
# Pick markets for me by theme (nothing to look up, never goes stale):
#
#   curl -fsSL https://docs.polybaskets.xyz/create-basket.sh | bash -s -- --theme bitcoin
#
# Or say exactly which markets and weights:
#
#   curl -fsSL https://docs.polybaskets.xyz/create-basket.sh | bash -s -- \
#     --name "BTC Strength" --desc "Bitcoin holds its range" \
#     --legs "<id>:YES:4000,<id>:YES:3500,<id>:NO:2500"
#
# legs = <polymarket numeric market id>:<YES|NO>:<weight in basis points>, comma separated,
# summing to 10000. Slug and end date are fetched from Polymarket automatically.
# Use --list <theme> to see current market ids without creating anything.
#
# Needs: node 18+ with npm, curl, jq. Installs vara-wallet if missing. Gas is paid by
# the PolyBaskets voucher backend; the wallet never needs VARA of its own.
set -euo pipefail

NAME=""; DESC=""; LEGS=""; WALLET="agent"; THEME=""; COUNT=3; LIST_ONLY=false
while [ $# -gt 0 ]; do
  case "$1" in
    --name) NAME="$2"; shift 2 ;;
    --desc) DESC="$2"; shift 2 ;;
    --legs) LEGS="$2"; shift 2 ;;
    --theme) THEME="$2"; shift 2 ;;
    --count) COUNT="$2"; shift 2 ;;
    --list) THEME="$2"; LIST_ONLY=true; shift 2 ;;
    --wallet) WALLET="$2"; shift 2 ;;
    -h|--help) echo "usage: --theme <word> [--count N] | --name <name> [--desc <text>] --legs id:YES|NO:bps,... ; --list <word> to browse"; exit 0 ;;
    *) echo "unknown argument: $1" >&2; exit 2 ;;
  esac
done
[ -n "$THEME" ] || [ -n "$LEGS" ] || { echo "usage: --theme <word> [--count N]   or   --name <name> --legs id:YES|NO:bps,..." >&2; exit 2; }
case "$COUNT" in ''|*[!0-9]*) echo "--count must be a number" >&2; exit 2 ;; esac
[ "$COUNT" -ge 2 ] && [ "$COUNT" -le 8 ] || { echo "--count must be between 2 and 8" >&2; exit 2; }

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

if [ -n "$THEME" ]; then
  step "Finding live markets for \"$THEME\""
  NOW=$(date -u +%Y-%m-%dT%H:%M:%SZ)
  MARKETS=$(curl -fsS "https://gamma-api.polymarket.com/markets?closed=false&order=volume24hr&ascending=false&end_date_min=$NOW&limit=500")
  NOW_MS=$(node -e 'console.log(Date.now())')
  # live, resolvable, not already decided, question matches the theme, newest-ending first among top volume
  PICKED=$(echo "$MARKETS" | jq -c --arg t "$THEME" --argjson now "$NOW_MS" --argjson n "$COUNT" '
    [ .[]
      | select(.question != null and .slug != null and .endDate != null and .outcomePrices != null)
      | select(.question | ascii_downcase | contains($t | ascii_downcase))
      | {id, question, slug, endDate, ends: (.endDate | fromdateiso8601 * 1000), yes: ((.outcomePrices | fromjson | .[0]) | tonumber)}
      | select(.ends > ($now + 3600000))
      | select(.yes > 0.03 and .yes < 0.97)
    ] | unique_by(.question) | .[0:$n]')
  FOUND=$(echo "$PICKED" | jq 'length')
  if [ "$FOUND" -lt 2 ]; then
    echo "Only $FOUND live market(s) matched \"$THEME\"." >&2
    echo "Try a broader word (bitcoin, ethereum, fed, election, ai) or pass --legs explicitly." >&2
    echo "Browse what is live now:  ... | bash -s -- --list <word>" >&2
    exit 1
  fi
  if [ "$LIST_ONLY" = true ]; then
    echo "$PICKED" | jq -r '.[] | "  id \(.id)  yes \(.yes)  ends \(.endDate)  \(.question)"'
    echo
    echo "Create with:  ... | bash -s -- --name \"<name>\" --legs \"$(echo "$PICKED" | jq -r '[.[] | "\(.id):YES:<bps>"] | join(",")')\""
    exit 0
  fi
  # equal weights, remainder to the first leg, always exactly 10000
  EACH=$((10000 / FOUND)); FIRST=$((10000 - EACH * (FOUND - 1)))
  LEGS=$(echo "$PICKED" | jq -r --argjson each "$EACH" --argjson first "$FIRST" \
    '[ to_entries[] | "\(.value.id):YES:\(if .key == 0 then $first else $each end)" ] | join(",")')
  [ -n "$NAME" ] || NAME="$(echo "$THEME" | tr '[:lower:]' '[:upper:]' | cut -c1-40) basket"
  [ -n "$DESC" ] || DESC="Live $THEME markets, equally weighted, created $(date -u +%Y-%m-%d)"
  echo "$PICKED" | jq -r '.[] | "  \(.question)  (yes \(.yes), ends \(.endDate))"'
fi

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
  if [ "$END_MS" -le "$NOW_MS" ]; then
    echo "market $ID already ended on $END." >&2
    echo "Market ids expire; run with --theme <word> to pick live ones automatically, or --list <word> to browse." >&2
    exit 1
  fi
  [ "$END_MS" -gt $((NOW_MS + 600000)) ] || { echo "market $ID ends within 10 minutes ($END); pick another or use --theme" >&2; exit 1; }
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
