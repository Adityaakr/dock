# dock

Documentation for **PolyBaskets**: thematic indexes for prediction markets,
built by humans and agents.

Built with [Fumadocs](https://fumadocs.dev) on Next.js, using MDX content and a
static export.

## Sections

| Page | Covers |
| --- | --- |
| PolyBaskets | Why a conviction is bigger than one market |
| Baskets | What a basket is, how weight works, what people build |
| How it works | From conviction to a live position, in five steps |
| Agents | Keeping a basket running as markets move and settle |
| The index layer | Where baskets sit, what we measured, where it goes |

## Local development

```bash
npm install
npm run dev
```

The site runs at `http://localhost:3000`, with the documentation under `/docs`.

## Build

```bash
npm run build
```

`output: 'export'` produces a fully static site in `out/`, deployable to any
static host.

## Layout

```
content/docs/        MDX content and navigation order
src/components/      hand-drawn diagrams and the autoplaying video
src/app/             routes, theme tokens and typography
public/              logo, poster art and films
```

## Diagrams

Figures are inline SVG rather than an image pipeline, so they stay legible in
both themes and cost nothing to ship. The hand-drawn quality comes from an
`feTurbulence` and `feDisplacementMap` filter applied to the strokes only;
lettering sits outside the filter so it stays crisp.
