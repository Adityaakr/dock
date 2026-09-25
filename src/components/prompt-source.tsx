import fs from 'node:fs';
import path from 'node:path';
import { DynamicCodeBlock } from 'fumadocs-ui/components/dynamic-codeblock';

/**
 * Renders a file from public/ as a real code block, read at build time.
 *
 * The starter prompt used to be pasted into the MDX by hand alongside the
 * CopyPrompt button, which fetches public/starter-prompt.md. The two drifted:
 * the page showed a stale prompt (hardcoded STAKE_VARA=10, no create-only mode)
 * while the button handed over the current one. Reading the same file the button
 * fetches makes that impossible.
 *
 * It must go through DynamicCodeBlock rather than a bare <pre><code>. A plain
 * pre skips Fumadocs' code-block styling and the prose rules render every line
 * as its own highlighted strip.
 */
export function PromptSource({ file, lang = 'markdown' }: { file: string; lang?: string }) {
  const full = path.join(process.cwd(), 'public', file);
  const source = fs.readFileSync(full, 'utf8');
  return (
    <div className="prompt-block">
      <DynamicCodeBlock lang={lang} code={source} />
    </div>
  );
}
