import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repositoryPath = '/masters-of-design-geometry-study';

const nextConfig: NextConfig = isGitHubPages
  ? {
      output: 'export',
      assetPrefix: repositoryPath,
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {};

export default nextConfig;
