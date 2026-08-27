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
