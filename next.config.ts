import type { NextConfig } from 'next';

const repositoryName = 'next-tiktok';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: `/${repositoryName}`,
  assetPrefix: `/${repositoryName}`,
  trailingSlash: true,
  sassOptions: {
    additionalData: `$var: red;`,
    implementation: 'sass-embedded',
  },
}

export default nextConfig;
