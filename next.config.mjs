import { createMDX } from 'fumadocs-mdx/next';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const withMDX = createMDX();

// This app lives inside the PolyBaskets repo, which has its own lockfile.
// Pin the workspace root so Next doesn't infer the parent directory.
const here = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  reactStrictMode: true,
  // Static export has no image optimisation server.
  images: { unoptimized: true },
  turbopack: {
    root: here,
  },
};

export default withMDX(config);
