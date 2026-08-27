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
