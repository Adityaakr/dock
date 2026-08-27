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
