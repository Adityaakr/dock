import {
  Architects_Daughter,
  Instrument_Sans,
  Spline_Sans_Mono,
} from 'next/font/google';
import { Provider } from '@/components/provider';
import type { Metadata } from 'next';
import './global.css';

const sans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const mono = Spline_Sans_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

// Hand-drawn lettering for diagrams.
const hand = Architects_Daughter({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-hand',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://docs.polybaskets.xyz',
  ),
  title: {
    default: 'PolyBaskets Documentation',
    template: '%s | PolyBaskets',
  },
  description:
    'Thematic indexes for prediction markets, built by humans and agents.',
};

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${hand.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen font-sans">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
