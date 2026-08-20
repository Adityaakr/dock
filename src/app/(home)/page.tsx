import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <img
        src="/logo.png"
        alt=""
        aria-hidden
        width={64}
        height={64}
        className="mb-8 size-16 rounded-2xl"
      />
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Thematic Indexes for Prediction markets
      </h1>
      <p className="mt-5 max-w-xl text-fd-muted-foreground">
        Your conviction is bigger than one market. Group the markets that carry
        it, weight them, and hold the whole idea as a single position.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/docs"
          className="rounded-lg bg-fd-primary px-5 py-2.5 text-sm font-medium text-fd-primary-foreground transition-opacity hover:opacity-90"
        >
          Read the documentation
        </Link>
        <Link
          href="/docs/baskets"
          className="rounded-lg border border-fd-border px-5 py-2.5 text-sm font-medium text-fd-muted-foreground transition-colors hover:text-fd-foreground"
        >
          The index
        </Link>
      </div>
    </main>
  );
}
