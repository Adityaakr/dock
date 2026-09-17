'use client';

import { useState } from 'react';

/**
 * Big, explicit "copy the whole prompt" button. Fetches the raw prompt file
 * so what lands on the clipboard is byte-identical to what agents curl,
 * regardless of how the highlighted code block wraps or clips on screen.
 */
export function CopyPrompt({ src, label = 'Copy the whole prompt' }: { src: string; label?: string }) {
  const [state, setState] = useState<'idle' | 'copying' | 'done' | 'error'>('idle');

  const copy = async () => {
    setState('copying');
    try {
      const res = await fetch(src);
      if (!res.ok) throw new Error(String(res.status));
      await navigator.clipboard.writeText(await res.text());
      setState('done');
      window.setTimeout(() => setState('idle'), 2500);
    } catch {
      setState('error');
      window.setTimeout(() => setState('idle'), 3000);
    }
  };

  const text =
    state === 'done'
      ? 'Copied. Paste it into your agent.'
      : state === 'error'
        ? 'Copy failed. Open the raw file below and copy from there.'
        : state === 'copying'
          ? 'Copying...'
          : label;

  return (
    <button
      type="button"
      onClick={copy}
      disabled={state === 'copying'}
      className={`my-4 w-full rounded-lg border px-4 py-3 text-sm font-semibold transition-colors ${
        state === 'done'
          ? 'border-green-600/50 bg-green-600/15 text-green-700 dark:text-green-400'
          : state === 'error'
            ? 'border-red-600/50 bg-red-600/15 text-red-700 dark:text-red-400'
            : 'border-fd-primary/40 bg-fd-primary/10 text-fd-primary hover:bg-fd-primary/20'
      }`}
    >
      {text}
    </button>
  );
}
