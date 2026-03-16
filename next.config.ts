import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',                    // обов'язково для GitHub Pages
  images: {
    unoptimized: true,                 // GitHub Pages не підтримує next/image оптимізацію
  },
  trailingSlash: true,

  // Важливо для репозиторію portfolio-gym
  basePath: '/portfolio-gym',
  assetPrefix: '/portfolio-gym/',
};

export default nextConfig;