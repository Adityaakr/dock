import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { appName } from './shared';

function Logo() {
  return (
    <img
      src="/logo.png"
      alt=""
      aria-hidden
      width={24}
      height={24}
      className="size-6 rounded-md"
    />
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <Logo />
          <span className="font-semibold tracking-tight">{appName}</span>
        </>
      ),
    },
    links: [{ text: 'Documentation', url: '/docs', active: 'nested-url' }],
  };
}
