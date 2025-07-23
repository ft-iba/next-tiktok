import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  sassOptions: {
    additionalData: `$var: red;`,
    implementation: 'sass-embedded',
  },
}

export default nextConfig;
