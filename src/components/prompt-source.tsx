import fs from 'node:fs';
import path from 'node:path';

/**
 * Renders a file from public/ inline at build time.
 *
 * The starter prompt used to be pasted into the MDX by hand alongside the
 * CopyPrompt button, which fetches public/starter-prompt.md. The two drifted:
 * the page showed a stale prompt (hardcoded STAKE_VARA=10, no create-only mode)
 * while the button handed over the current one. Reading the same file the button
 * fetches makes that impossible.
 */
export function PromptSource({ file, lang = 'markdown' }: { file: string; lang?: string }) {
  const full = path.join(process.cwd(), 'public', file);
  const source = fs.readFileSync(full, 'utf8');
  return (
    <div className="prompt-block">
      <pre>
        <code className={`language-${lang}`}>{source}</code>
      </pre>
    </div>
  );
}
