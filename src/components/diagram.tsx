import type { ReactNode } from 'react';

/* ══════════════════════════════════════════════════════════════════
   Professional diagrams (protocol-map style).

   Solid icon nodes with soft shadows, pill tags, uppercase flow
   labels and dashed return flows. Colour comes from the theme
   tokens, so light and dark both resolve as a set.
   ══════════════════════════════════════════════════════════════════ */

function ProFigure({
  caption,
  alt,
  viewBox,
  minWidth = 680,
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
          className="pb-pro"
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

function ProDefs({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={`${id}-ah`}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" className="p-arrow" />
      </marker>
      <marker
        id={`${id}-ah2`}
        viewBox="0 0 10 10"
        refX="8"
        refY="5"
        markerWidth="7"
        markerHeight="7"
        orient="auto-start-reverse"
      >
        <path d="M 0 0 L 10 5 L 0 10 z" className="p-arrow-2" />
      </marker>
      <filter id={`${id}-sh`} x="-40%" y="-40%" width="180%" height="180%">
        <feDropShadow dx="0" dy="2.5" stdDeviation="3.5" floodOpacity="0.22" />
      </filter>
    </defs>
  );
}

/* Icon glyphs, drawn around (0,0) inside a node circle. */

function IconPeople() {
  return (
    <g className="p-node-ic-fill">
      <circle cx={-5.5} cy={-6} r={4.4} />
      <path d="M -13 9 c 0 -6.5 3.6 -10 7.5 -10 c 3.9 0 7.5 3.5 7.5 10 z" />
      <circle cx={7} cy={-7.5} r={3.6} />
      <path d="M 3.4 6.5 c 0.4 -5 3 -8 6 -8 c 3 0 5.6 3 5.6 8 z" />
    </g>
  );
}

function IconPerson() {
  return (
    <g className="p-node-ic-fill">
      <circle cx={0} cy={-5} r={4.6} />
      <path d="M -8.5 9.5 c 0 -7 4.2 -10.5 8.5 -10.5 c 4.3 0 8.5 3.5 8.5 10.5 z" />
    </g>
  );
}

function IconBot() {
  return (
    <g>
      <g className="p-node-ic">
        <rect x={-9.5} y={-6} width={19} height={13.5} rx={3.5} />
        <path d="M 0 -6 V -10.5" />
      </g>
      <g className="p-node-ic-fill">
        <circle cx={-4.2} cy={0.8} r={1.8} />
        <circle cx={4.2} cy={0.8} r={1.8} />
        <circle cx={0} cy={-12} r={1.8} />
      </g>
    </g>
  );
}

function IconGrid() {
  return (
    <g className="p-node-ic">
      <rect x={-11} y={-11} width={9.5} height={9.5} rx={2} />
      <rect x={1.5} y={-11} width={9.5} height={9.5} rx={2} />
      <rect x={-11} y={1.5} width={9.5} height={9.5} rx={2} />
      <rect x={1.5} y={1.5} width={9.5} height={9.5} rx={2} />
    </g>
  );
}

function IconToken() {
  return (
    <text
      y={7.5}
      textAnchor="middle"
      fontSize="21"
      fontWeight="700"
      className="p-node-ic-fill"
    >
      $
    </text>
  );
}

function IconVault() {
  return (
    <g className="p-node-ic">
      <path d="M -12 -3.5 L 0 -11.5 L 12 -3.5" />
      <path d="M -8.5 0 v 8.5 M -2.8 0 v 8.5 M 2.8 0 v 8.5 M 8.5 0 v 8.5" />
      <path d="M -12 11.5 h 24" />
    </g>
  );
}

function IconIdea() {
  return (
    <g>
      <g className="p-node-ic">
        <path d="M -7 -2 a 7 7 0 1 1 14 0 c 0 3 -2 4.5 -3.2 6.5 h -7.6 C -5 2.5 -7 1 -7 -2 z" />
        <path d="M -3.4 8 h 6.8 M -2.4 11.2 h 4.8" />
      </g>
    </g>
  );
}

function IconEye() {
  return (
    <g>
      <path
        d="M -12 0 C -7 -7.5 7 -7.5 12 0 C 7 7.5 -7 7.5 -12 0 z"
        className="p-node-ic"
      />
      <circle cx={0} cy={0} r={3.4} className="p-node-ic-fill" />
    </g>
  );
}

function IconRadar() {
  return (
    <g>
      <g className="p-node-ic">
        <circle cx={0} cy={0} r={11} />
        <circle cx={0} cy={0} r={5.5} />
        <path d="M 0 0 L 8 -8" />
      </g>
      <circle cx={8} cy={-8} r={2} className="p-node-ic-fill" />
    </g>
  );
}

function IconSliders() {
  return (
    <g>
      <g className="p-node-ic">
        <path d="M -11 -6 h 22 M -11 0 h 22 M -11 6 h 22" />
      </g>
      <g className="p-node-ic-fill">
        <circle cx={-4} cy={-6} r={2.6} />
        <circle cx={5} cy={0} r={2.6} />
        <circle cx={-1} cy={6} r={2.6} />
      </g>
    </g>
  );
}

/* Building blocks */

function ProNode({
  x,
  y,
  fid,
  icon,
  label,
  label2,
  sub,
}: {
  x: number;
  y: number;
  fid: string;
  icon: ReactNode;
  label: string;
  label2?: string;
  sub?: string;
}) {
  const labelY = y + 52;
  return (
    <g>
      <circle cx={x} cy={y} r={30} className="p-node" filter={`url(#${fid}-sh)`} />
      <ellipse cx={x} cy={y - 12} rx={22} ry={12} className="p-node-hi" />
      <g transform={`translate(${x} ${y})`}>{icon}</g>
      <text x={x} y={labelY} textAnchor="middle" fontSize="13.5" className="p-t">
        {label}
      </text>
      {label2 ? (
        <text x={x} y={labelY + 17} textAnchor="middle" fontSize="13.5" className="p-t">
          {label2}
        </text>
      ) : null}
      {sub ? (
        <text
          x={x}
          y={labelY + (label2 ? 34 : 17)}
          textAnchor="middle"
          fontSize="11"
          className="p-sub"
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function ProPill({
  x,
  y,
  w,
  text,
}: {
  x: number;
  y: number;
  w: number;
  text: string;
}) {
  return (
    <g>
      <rect x={x - w / 2} y={y - 10} width={w} height={20} rx={10} className="p-pill" />
      <text x={x} y={y + 3.5} textAnchor="middle" className="p-pill-t">
        {text}
      </text>
    </g>
  );
}

function ProChipRow({
  cx,
  y,
  chips,
}: {
  cx: number;
  y: number;
  chips: { t: string; w: number }[];
}) {
  const total = chips.reduce((s, c) => s + c.w, 0) + (chips.length - 1) * 10;
  let x = cx - total / 2;
  return (
    <g>
      {chips.map((c) => {
        const cxx = x;
        x += c.w + 10;
        return (
          <g key={c.t}>
            <rect x={cxx} y={y} width={c.w} height={22} rx={5} className="p-pill" />
            <text x={cxx + c.w / 2} y={y + 14.5} textAnchor="middle" className="p-pill-t">
              {c.t}
            </text>
          </g>
        );
      })}
    </g>
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
  const fid = 'pro-spread';
  const rowY = (i: number) => 44 + i * 52;

  return (
    <ProFigure
      viewBox="0 0 960 372"
      minWidth={720}
      caption="One belief touches many markets. Betting it on a single question captures only a sliver of what you actually think."
      alt="A single conviction on the left fanning out into six separate prediction markets on the right."
    >
      <ProDefs id={fid} />

      <ProNode
        x={150}
        y={168}
        fid={fid}
        icon={<IconIdea />}
        label="“AI will reshape"
        label2="the economy”"
        sub="one conviction"
      />

      <text x={715} y={30} textAnchor="middle" fontSize="11" className="p-cap">
        MANY MARKETS
      </text>

      {SPREAD.map((m, i) => (
        <g key={m}>
          <path
            d={`M 188 168 C 350 168, 390 ${rowY(i) + 18}, 552 ${rowY(i) + 18}`}
            className="p-line"
            markerEnd={`url(#${fid}-ah)`}
          />
          <rect x={560} y={rowY(i)} width={310} height={36} rx={8} className="p-box" />
          <text x={578} y={rowY(i) + 23} fontSize="13" className="p-t">
            {m}
          </text>
        </g>
      ))}

      <text x={20} y={356} fontSize="12" className="p-sub">
        each market answers one question; none of them answers yours
      </text>
    </ProFigure>
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
  const fid = 'pro-weights';
  const bx = 300;
  const full = 500; // width of the largest weight
  const cy = (i: number) => 84 + i * 44;

  return (
    <ProFigure
      viewBox="0 0 960 330"
      minWidth={680}
      caption="Weight is how much of your conviction rides on each market. The same markets, weighted differently, are a different view."
      alt="The AI Boom basket: five markets weighted 30, 25, 20, 15 and 10 percent, summing to 100 percent."
    >
      <ProDefs id={fid} />

      <text x={24} y={36} fontSize="15" className="p-t">
        AI Boom Basket
      </text>
      <path d="M 24 52 H 936" className="p-rule" />

      {BASKET.map((b, i) => (
        <g key={b.name}>
          <text x={24} y={cy(i) + 4.5} fontSize="13.5" className="p-t">
            {b.name}
          </text>
          <rect
            x={bx}
            y={cy(i) - 13}
            width={(b.w / 30) * full}
            height={26}
            rx={6}
            className="p-node"
            filter={`url(#${fid}-sh)`}
          />
          <text
            x={bx + (b.w / 30) * full + 14}
            y={cy(i) + 4.5}
            fontSize="12"
            className="p-cap"
          >
            {b.w}%
          </text>
        </g>
      ))}

      <path d="M 24 290 H 936" className="p-rule" />
      <text x={24} y={316} fontSize="12" className="p-sub">
        one basket
      </text>
      <text x={bx} y={316} fontSize="12" className="p-cap-2">
        100%
      </text>
    </ProFigure>
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
  const fid = 'pro-flow';
  const w = 160;
  const x = (i: number) => 20 + i * 190;

  return (
    <ProFigure
      viewBox="0 0 960 260"
      minWidth={760}
      caption="Pick a conviction, gather the markets that carry it, weight them, and hold one position. Agents keep it current after that."
      alt="Five steps: conviction, find markets, build the basket, trade it, and let agents manage it continuously."
    >
      <ProDefs id={fid} />

      {STEPS.map((s, i) => (
        <g key={s.n}>
          <text x={x(i) + w / 2} y={56} textAnchor="middle" fontSize="11" className="p-cap">
            {s.n}
          </text>
          <rect
            x={x(i)}
            y={70}
            width={w}
            height={100}
            rx={10}
            className={s.hot ? 'p-node' : 'p-box'}
            filter={s.hot ? `url(#${fid}-sh)` : undefined}
          />
          <text
            x={x(i) + w / 2}
            y={108}
            textAnchor="middle"
            fontSize="14"
            className={s.hot ? 'p-inv' : 'p-t'}
          >
            {s.a}
          </text>
          <text
            x={x(i) + w / 2}
            y={130}
            textAnchor="middle"
            fontSize="11.5"
            className={s.hot ? 'p-inv-sub' : 'p-sub'}
          >
            {s.b}
          </text>
          <text
            x={x(i) + w / 2}
            y={146}
            textAnchor="middle"
            fontSize="11.5"
            className={s.hot ? 'p-inv-sub' : 'p-sub'}
          >
            {s.c}
          </text>
          {i < STEPS.length - 1 && (
            <path
              d={`M ${x(i) + w + 4} 120 H ${x(i + 1) - 7}`}
              className="p-line"
              markerEnd={`url(#${fid}-ah)`}
            />
          )}
        </g>
      ))}

      <text x={20} y={216} fontSize="12" className="p-sub">
        your conviction does not have to stop when you close your laptop
      </text>
      <text x={20} y={240} fontSize="11" className="p-cap">
        CONVICTION, RUNNING 24/7
      </text>
    </ProFigure>
  );
}

/* ── The agent loop ─────────────────────────────────────────────── */

export function AgentLoop() {
  const fid = 'pro-agent';
  const nodeY = 200;

  return (
    <ProFigure
      viewBox="0 0 960 350"
      minWidth={760}
      caption="Humans define the conviction. Agents keep it operating as markets move, settle and launch."
      alt="Agents monitor markets, spot what changed and adjust exposure in a continuous loop, guided by the basket objective."
    >
      <ProDefs id={fid} />

      {/* the objective, guiding the loop */}
      <rect x={365} y={24} width={230} height={38} rx={10} className="p-box-2" />
      <text x={480} y={48} textAnchor="middle" fontSize="11" className="p-cap-2">
        THE BASKET OBJECTIVE
      </text>
      <path d="M 480 66 V 160" className="p-dash-2" markerEnd={`url(#${fid}-ah2)`} />

      {/* the loop */}
      <ProNode
        x={150}
        y={nodeY}
        fid={fid}
        icon={<IconEye />}
        label="Monitor markets"
        sub="prices, resolutions, launches"
      />
      <ProNode
        x={480}
        y={nodeY}
        fid={fid}
        icon={<IconRadar />}
        label="Spot what changed"
        sub="moved odds, new markets"
      />
      <ProNode
        x={810}
        y={nodeY}
        fid={fid}
        icon={<IconSliders />}
        label="Adjust exposure"
        sub="weights, entries, exits"
      />

      <path d={`M 188 ${nodeY} H 440`} className="p-line" markerEnd={`url(#${fid}-ah)`} />
      <path d={`M 518 ${nodeY} H 770`} className="p-line" markerEnd={`url(#${fid}-ah)`} />

      {/* continuous return */}
      <path
        d={`M 840 ${nodeY + 6} H 916 V 322 H 44 V ${nodeY + 10} H 112`}
        className="p-dash"
        markerEnd={`url(#${fid}-ah)`}
      />
      <text x={480} y={312} textAnchor="middle" fontSize="11" className="p-cap">
        CONTINUOUS · 24/7
      </text>
    </ProFigure>
  );
}

/* ── Who builds the basket ──────────────────────────────────────── */

const MODES = [
  {
    t: 'Human-built',
    icon: <IconPerson />,
    a: 'A trader writes the thesis,',
    b: 'picks the markets, and',
    c: 'controls the basket.',
  },
  {
    t: 'Agent-assisted',
    icon: <IconPeople />,
    a: 'A trader defines the',
    b: 'strategy while agents',
    c: 'monitor and manage it.',
    hot: true,
  },
  {
    t: 'Agent-built',
    icon: <IconBot />,
    a: 'Agents discover markets,',
    b: 'construct baskets, and',
    c: 'operate the strategy.',
  },
];

export function ParticipantModes() {
  const fid = 'pro-modes';
  const w = 296;
  const x = (i: number) => 20 + i * 312;

  return (
    <ProFigure
      viewBox="0 0 960 300"
      minWidth={720}
      caption="Not a replacement for traders. Humans create ideas, agents operate them, and other people can find and trade the result."
      alt="Three ways a basket gets built: human-built, agent-assisted, and agent-built."
    >
      <ProDefs id={fid} />

      {MODES.map((m, i) => (
        <g key={m.t}>
          <rect
            x={x(i)}
            y={36}
            width={w}
            height={170}
            rx={10}
            className={m.hot ? 'p-box-hot' : 'p-box'}
          />
          <circle
            cx={x(i) + 42}
            cy={72}
            r={17}
            className="p-node"
            filter={`url(#${fid}-sh)`}
          />
          <g transform={`translate(${x(i) + 42} ${72}) scale(0.66)`}>{m.icon}</g>
          <text x={x(i) + 70} y={78} fontSize="14.5" className="p-t">
            {m.t}
          </text>
          <path d={`M ${x(i) + 24} 102 H ${x(i) + w - 24}`} className="p-rule" />
          <text x={x(i) + 24} y={130} fontSize="12.5" className="p-sub">
            {m.a}
          </text>
          <text x={x(i) + 24} y={150} fontSize="12.5" className="p-sub">
            {m.b}
          </text>
          <text x={x(i) + 24} y={170} fontSize="12.5" className="p-sub">
            {m.c}
          </text>
        </g>
      ))}

      <text x={20} y={252} fontSize="12" className="p-sub">
        humans create ideas · agents operate them · others discover and trade them
      </text>
      <text x={20} y={276} fontSize="12" className="p-sub" opacity={0.7}>
        the interesting part is what happens when the three start interacting
      </text>
    </ProFigure>
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
  const fid = 'pro-stack';
  const w = 460;
  const x = 150;
  const y = (i: number) => 24 + i * 86;

  return (
    <ProFigure
      viewBox="0 0 760 450"
      minWidth={600}
      caption="Individual markets stay the primitive. PolyBaskets is the layer that turns them into something you can hold as a single view."
      alt="A stack: individual prediction markets at the base, PolyBaskets above them, then thematic indexes, agent strategies, and new financial products."
    >
      <ProDefs id={fid} />

      {STACK.map((l, i) => (
        <g key={l.t}>
          <rect
            x={x}
            y={y(i)}
            width={w}
            height={58}
            rx={10}
            className={l.hot ? 'p-node' : 'p-box'}
            filter={l.hot ? `url(#${fid}-sh)` : undefined}
          />
          <text
            x={x + w / 2}
            y={y(i) + 26}
            textAnchor="middle"
            fontSize={l.hot ? '15' : '14'}
            className={l.hot ? 'p-inv' : 'p-t'}
          >
            {l.t}
          </text>
          <text
            x={x + w / 2}
            y={y(i) + 45}
            textAnchor="middle"
            fontSize="11"
            className={l.hot ? 'p-inv-sub' : 'p-sub'}
          >
            {l.s}
          </text>
          {i < STACK.length - 1 && (
            <g className="p-line">
              <path d={`M ${x + w / 2} ${y(i) + 62} V ${y(i) + 80}`} />
              <path
                d={`M ${x + w / 2 - 5} ${y(i) + 75.5} L ${x + w / 2} ${y(i) + 81.5} L ${x + w / 2 + 5} ${y(i) + 75.5}`}
              />
            </g>
          )}
        </g>
      ))}

      <text
        x={60}
        y={220}
        fontSize="10.5"
        className="p-cap"
        textAnchor="middle"
        transform="rotate(-90 60 220)"
      >
        HIGHER-LEVEL PRODUCTS
      </text>
    </ProFigure>
  );
}

/* ── The $INDEX economy loop ────────────────────────────────────── */

export function IndexEconomyLoop() {
  const fid = 'pro-econ';
  const nodeY = 210;

  return (
    <ProFigure
      viewBox="0 0 960 400"
      minWidth={760}
      caption="The loop the economics are built around. Usage generates activity and fees, $INDEX routes rewards back to participants, and better indexes bring more usage."
      alt="Users and agents create, trade and manage thematic indexes; activity and fees flow into $INDEX, which coordinates the vault and staking, liquidity, governance, Agent Arena and curated strategies, and routes rewards and incentives back to participants."
    >
      <ProDefs id={fid} />

      {/* coordination chips above $INDEX */}
      <text x={790} y={36} textAnchor="middle" fontSize="11" className="p-cap">
