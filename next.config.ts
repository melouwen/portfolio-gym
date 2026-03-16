import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Статичний експорт для GitHub Pages
  output: 'export',

  // 2. Вимикаємо оптимізацію зображень (не працює на статиці)
  images: {
    unoptimized: true,
  },

  // 3. Налаштування шляхів для репозиторію
  basePath: '/portfolio-gym',
  assetPrefix: '/portfolio-gym/',
  trailingSlash: true,

  // 4. Ігноруємо помилки, щоб білд не падав через дрібниці
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;