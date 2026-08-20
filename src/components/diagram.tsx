import type { ReactNode } from 'react';

/* ══════════════════════════════════════════════════════════════════
   Hand-drawn diagrams.

   The sketchy quality comes from an feTurbulence + feDisplacementMap
   filter applied to the STROKES only. Text is kept outside the
   filtered group so it stays crisp and legible.
   ══════════════════════════════════════════════════════════════════ */

function Rough({ id, scale = 2.3 }: { id: string; scale?: number }) {
  return (
    <defs>
      <filter id={id} x="-5%" y="-10%" width="110%" height="120%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.022"
          numOctaves="3"
          seed="9"
          result="n"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="n"
          scale={scale}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  );
}

function Figure({
  caption,
  alt,
  viewBox,
  minWidth = 600,
  children,
}: {
  caption?: string;
  alt: string;
  viewBox: string;
  minWidth?: number;
  children: ReactNode;
}) {
  return (
    <figure className="my-6 not-prose">
      <div className="overflow-x-auto rounded-lg border border-fd-border bg-fd-card p-3">
        <svg
          viewBox={viewBox}
          className="pb-sketch"
          style={{ minWidth }}
          role="img"
          aria-label={alt}
        >
          {children}
        </svg>
      </div>
      {caption ? (
        <figcaption className="mt-2 px-1 text-sm text-fd-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/* ── One conviction, many markets ───────────────────────────────── */

const SPREAD = [
  'AI adoption',
  'Semiconductor demand',
  'Data-center expansion',
  'Energy demand',
  'Regulation',
  'Compute infrastructure',
];

export function ConvictionSpread() {
  const bx = 452;
  const bw = 286;
  const rowY = (i: number) => 34 + i * 44;

  return (
    <Figure
      viewBox="0 0 760 316"
      minWidth={660}
      caption="One belief touches many markets. Betting it on a single question captures only a sliver of what you actually think."
      alt="A single conviction on the left fanning out into six separate prediction markets on the right."
    >
      <Rough id="rgh-spread" />

      <g filter="url(#rgh-spread)">
        <rect x={22} y={116} width={216} height={84} rx={7} className="s-fill-win" />
        <rect x={22} y={116} width={216} height={84} rx={7} className="s-win" />
        {SPREAD.map((_, i) => (
          <g key={i}>
            <rect x={bx} y={rowY(i)} width={bw} height={32} rx={5} className="s-fill-mute" />
            <rect x={bx} y={rowY(i)} width={bw} height={32} rx={5} className="s-line" />
            <path
              d={`M 244 158 C 340 158, 356 ${rowY(i) + 16}, ${bx - 8} ${rowY(i) + 16}`}
              className="s-lose"
            />
          </g>
        ))}
      </g>

      <text x={130} y={152} textAnchor="middle" fontSize="14" className="t-win">
        “AI will reshape
      </text>
      <text x={130} y={172} textAnchor="middle" fontSize="14" className="t-win">
        the economy”
      </text>
      <text x={130} y={218} textAnchor="middle" fontSize="12" className="t-faint">
        one conviction
      </text>

      {SPREAD.map((m, i) => (
        <text key={m} x={bx + 16} y={rowY(i) + 21} fontSize="13" className="t">
          {m}
        </text>
      ))}

      <text x={bx + bw} y={22} textAnchor="end" fontSize="12" className="t-faint">
        many markets
      </text>
      <text x={22} y={300} fontSize="12.5" className="t-faint">
        each market answers one question; none of them answers yours
      </text>
    </Figure>
  );
}

/* ── A basket, weighted ─────────────────────────────────────────── */

const BASKET = [
  { name: 'AI Adoption', w: 30 },
  { name: 'Semiconductors', w: 25 },
  { name: 'Data Centers', w: 20 },
  { name: 'Energy Demand', w: 15 },
  { name: 'AI Regulation', w: 10 },
];

export function BasketWeights() {
  const bx = 252;
  const full = 428; // width of the largest weight
  const rowY = (i: number) => 76 + i * 44;

  return (
    <Figure
      viewBox="0 0 760 316"
      minWidth={640}
      caption="Weight is how much of your conviction rides on each market. The same markets, weighted differently, are a different view."
      alt="The AI Boom basket: five markets weighted 30, 25, 20, 15 and 10 percent, summing to 100 percent."
    >
      <Rough id="rgh-weights" scale={2} />

      <text x={22} y={36} fontSize="15" className="t">
        AI Boom Basket
      </text>

      <g filter="url(#rgh-weights)">
        <path d="M 22 50 H 738" className="s-rule" />
        {BASKET.map((b, i) => {
          const w = (b.w / 30) * full;
          return (
            <g key={b.name}>
              <rect x={bx} y={rowY(i) - 18} width={w} height={26} rx={4} className="s-fill-win" />
              <rect x={bx} y={rowY(i) - 18} width={w} height={26} rx={4} className="s-win" />
            </g>
          );
        })}
        <path d="M 22 278 H 738" className="s-rule" />
      </g>

      {BASKET.map((b, i) => (
        <g key={b.name}>
          <text x={22} y={rowY(i)} fontSize="13.5" className="t">
            {b.name}
          </text>
          <text
            x={bx + (b.w / 30) * full + 12}
            y={rowY(i)}
            fontSize="13.5"
            className="t-win"
          >
            {b.w}%
          </text>
        </g>
      ))}

      <text x={22} y={302} fontSize="13.5" className="t-dim">
        one basket
      </text>
      <text x={bx} y={302} fontSize="14" className="t-mark">
        100%
      </text>
    </Figure>
  );
}

/* ── The flow ───────────────────────────────────────────────────── */

const STEPS = [
  { n: '1', a: 'Conviction', b: 'the idea you', c: 'want exposure to' },
  { n: '2', a: 'Find markets', b: 'related markets', c: 'across categories' },
  { n: '3', a: 'Build', b: 'select and', c: 'weight them' },
  { n: '4', a: 'Trade', b: 'one position,', c: 'many outcomes' },
  { n: '5', a: 'Agents run it', b: 'monitor and', c: 'adjust, always', hot: true },
];

export function BasketFlow() {
  const w = 134;
  const gap = 22;
  const x = (i: number) => 22 + i * (w + gap);

  return (
    <Figure
      viewBox="0 0 800 224"
      minWidth={720}
      caption="Pick a conviction, gather the markets that carry it, weight them, and hold one position. Agents keep it current after that."
      alt="Five steps: conviction, find markets, build the basket, trade it, and let agents manage it continuously."
    >
      <Rough id="rgh-flow" scale={2} />

      <g filter="url(#rgh-flow)">
        {STEPS.map((s, i) => (
          <g key={s.n}>
            <rect
              x={x(i)}
              y={54}
              width={w}
              height={92}
              rx={7}
              className={s.hot ? 's-fill-win' : 's-fill-mute'}
            />
            <rect
              x={x(i)}
              y={54}
              width={w}
              height={92}
              rx={7}
              className={s.hot ? 's-win' : 's-line'}
            />
            {i < STEPS.length - 1 && (
              <>
                <path d={`M ${x(i) + w + 3} 100 h ${gap - 10}`} className="s-line" />
                <path d={`M ${x(i) + w + gap - 13} 94 l 6 6 l -6 6`} className="s-line" />
              </>
            )}
          </g>
        ))}
      </g>

      {STEPS.map((s, i) => (
        <g key={s.n}>
          <text x={x(i) + w / 2} y={40} textAnchor="middle" fontSize="12" className="t-faint">
            {s.n}
          </text>
          <text
            x={x(i) + w / 2}
            y={86}
            textAnchor="middle"
            fontSize="13.5"
            className={s.hot ? 't-win' : 't'}
          >
            {s.a}
          </text>
          <text x={x(i) + w / 2} y={110} textAnchor="middle" fontSize="11.5" className="t-faint">
            {s.b}
          </text>
          <text x={x(i) + w / 2} y={126} textAnchor="middle" fontSize="11.5" className="t-faint">
            {s.c}
          </text>
        </g>
      ))}

      <text x={22} y={186} fontSize="13" className="t-dim">
        your conviction does not have to stop when you close your laptop
      </text>
      <text x={22} y={208} fontSize="13.5" className="t-win">
        conviction, running 24/7
      </text>
    </Figure>
  );
}

/* ── The agent loop ─────────────────────────────────────────────── */

export function AgentLoop() {
  return (
    <Figure
      viewBox="0 0 720 320"
      minWidth={620}
      caption="Humans define the conviction. Agents keep it operating as markets move, settle and launch."
      alt="A continuous loop: monitor markets, spot what changed, adjust exposure, and hold to the basket objective."
    >
      <Rough id="rgh-loop" scale={2} />

      <g filter="url(#rgh-loop)">
        <rect x={252} y={22} width={216} height={54} rx={6} className="s-fill-mute" />
        <rect x={252} y={22} width={216} height={54} rx={6} className="s-line" />

        <rect x={498} y={128} width={200} height={54} rx={6} className="s-fill-mute" />
        <rect x={498} y={128} width={200} height={54} rx={6} className="s-line" />

        <rect x={252} y={236} width={216} height={54} rx={6} className="s-fill-win" />
        <rect x={252} y={236} width={216} height={54} rx={6} className="s-win" />

        <rect x={22} y={128} width={200} height={54} rx={6} className="s-fill-mute" />
        <rect x={22} y={128} width={200} height={54} rx={6} className="s-line" />

        <path d="M 472 54 C 530 58, 560 92, 578 122" className="s-line" />
        <path d="M 570 112 l 9 12 l -14 2" className="s-line" />

        <path d="M 578 188 C 560 220, 528 252, 474 262" className="s-line" />
        <path d="M 486 254 l -13 9 l 8 11" className="s-line" />

        <path d="M 248 262 C 190 254, 158 220, 140 188" className="s-line" />
        <path d="M 148 200 l -8 -12 l 14 -2" className="s-line" />

        <path d="M 140 122 C 158 92, 190 58, 246 52" className="s-line" />
        <path d="M 234 60 l 13 -9 l -8 -11" className="s-line" />

        <rect x={276} y={130} width={168} height={52} rx={6} className="s-fill-mark" />
        <rect x={276} y={130} width={168} height={52} rx={6} className="s-mark" />
      </g>

      <text x={360} y={54} textAnchor="middle" fontSize="13.5" className="t">monitor markets</text>
      <text x={598} y={160} textAnchor="middle" fontSize="13.5" className="t">spot what changed</text>
      <text x={360} y={268} textAnchor="middle" fontSize="13.5" className="t-win">adjust exposure</text>
      <text x={122} y={160} textAnchor="middle" fontSize="13.5" className="t">new markets launch</text>

      <text x={360} y={152} textAnchor="middle" fontSize="12.5" className="t-mark">the basket</text>
      <text x={360} y={170} textAnchor="middle" fontSize="12.5" className="t-mark">objective</text>
    </Figure>
  );
}

/* ── Who builds the basket ──────────────────────────────────────── */

const MODES = [
  { t: 'Human-built', a: 'A trader writes the thesis,', b: 'picks the markets, and', c: 'controls the basket.' },
  { t: 'Agent-assisted', a: 'A trader defines the', b: 'strategy while agents', c: 'monitor and manage it.', hot: true },
  { t: 'Agent-built', a: 'Agents discover markets,', b: 'construct baskets, and', c: 'operate the strategy.' },
];

export function ParticipantModes() {
  const w = 234;
  const x = (i: number) => 22 + i * (w + 16);

  return (
    <Figure
      viewBox="0 0 760 250"
      minWidth={680}
      caption="Not a replacement for traders. Humans create ideas, agents operate them, and other people can find and trade the result."
      alt="Three ways a basket gets built: human-built, agent-assisted, and agent-built."
    >
      <Rough id="rgh-modes" scale={2} />

      <g filter="url(#rgh-modes)">
        {MODES.map((m, i) => (
          <g key={m.t}>
            <rect
              x={x(i)}
              y={30}
              width={w}
              height={148}
              rx={7}
              className={m.hot ? 's-fill-win' : 's-fill-mute'}
            />
            <rect
              x={x(i)}
              y={30}
              width={w}
              height={148}
              rx={7}
              className={m.hot ? 's-win' : 's-line'}
            />
            <path d={`M ${x(i) + 20} 74 H ${x(i) + w - 20}`} className="s-rule" />
          </g>
        ))}
      </g>

      {MODES.map((m, i) => (
        <g key={m.t}>
          <text
            x={x(i) + w / 2}
            y={62}
            textAnchor="middle"
            fontSize="14.5"
            className={m.hot ? 't-win' : 't'}
          >
            {m.t}
          </text>
          <text x={x(i) + 20} y={104} fontSize="12.5" className="t-dim">{m.a}</text>
          <text x={x(i) + 20} y={124} fontSize="12.5" className="t-dim">{m.b}</text>
          <text x={x(i) + 20} y={144} fontSize="12.5" className="t-dim">{m.c}</text>
        </g>
      ))}

      <text x={22} y={214} fontSize="13" className="t-dim">
        humans create ideas · agents operate them · others discover and trade them
      </text>
      <text x={22} y={236} fontSize="12.5" className="t-faint">
        the interesting part is what happens when the three start interacting
      </text>
    </Figure>
  );
}

/* ── The index layer ────────────────────────────────────────────── */

const STACK = [
  { t: 'Individual prediction markets', s: 'the underlying building blocks' },
  { t: 'PolyBaskets', s: 'grouping markets into one conviction', hot: true },
  { t: 'Thematic indexes', s: 'standardised, tradeable themes' },
  { t: 'Agent strategies', s: 'continuously operated exposure' },
  { t: 'New financial products', s: 'structured, perpetual, composable' },
];

export function IndexLayerStack() {
  const w = 420;
  const x = 150;
  const y = (i: number) => 24 + i * 74;

  return (
    <Figure
      viewBox="0 0 720 400"
      minWidth={560}
      caption="Individual markets stay the primitive. PolyBaskets is the layer that turns them into something you can hold as a single view."
      alt="A stack: individual prediction markets at the base, PolyBaskets above them, then thematic indexes, agent strategies, and new financial products."
    >
      <Rough id="rgh-stack" scale={2} />

      <g filter="url(#rgh-stack)">
        {STACK.map((l, i) => (
          <g key={l.t}>
            <rect
              x={x}
              y={y(i)}
              width={w}
              height={56}
              rx={7}
              className={l.hot ? 's-fill-win' : 's-fill-mute'}
            />
            <rect
              x={x}
              y={y(i)}
              width={w}
              height={56}
              rx={7}
              className={l.hot ? 's-win' : 's-line'}
            />
            {i < STACK.length - 1 && (
              <>
                <path d={`M ${x + w / 2} ${y(i) + 58} v 10`} className="s-line" />
                <path d={`M ${x + w / 2 - 6} ${y(i) + 62} l 6 8 l 6 -8`} className="s-line" />
              </>
            )}
          </g>
        ))}
      </g>

      {STACK.map((l, i) => (
        <g key={l.t}>
          <text
            x={x + w / 2}
            y={y(i) + 26}
            textAnchor="middle"
            fontSize={l.hot ? '16' : '14'}
            className={l.hot ? 't-win' : 't'}
          >
            {l.t}
          </text>
          <text
            x={x + w / 2}
            y={y(i) + 45}
            textAnchor="middle"
            fontSize="11.5"
            className={l.hot ? 't-win' : 't-faint'}
          >
            {l.s}
          </text>
        </g>
      ))}

      <text
        x={40}
        y={200}
        fontSize="12.5"
        className="t-faint"
        textAnchor="middle"
        transform="rotate(-90 40 200)"
      >
        higher-level products
      </text>
    </Figure>
  );
}
