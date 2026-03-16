import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Статичний експорт
  output: 'export',

  // 2. Зображення
  images: {
    unoptimized: true,
  },

  // 3. Шляхи GitHub Pages
  basePath: '/portfolio-gym',
  trailingSlash: true,

  // 4. Виправлений синтаксис для ігнорування помилок (Next.js 16+)
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;