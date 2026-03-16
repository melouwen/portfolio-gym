import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Дозволяє Next.js згенерувати статичні HTML-файли (замість роботи сервера)
  output: 'export',

  // 2. Вимикає стандартну оптимізацію зображень (вона потребує сервера, якого немає на GitHub Pages)
  images: {
    unoptimized: true,
  },

  // 3. Додає слеш у кінці URL (покращує SEO та сумісність з хостингом)
  trailingSlash: true,

  // 4. Вказує шлях до вашого репозиторію.
  // Тепер сайт буде знати, що він лежить у папці /portfolio-gym/
  basePath: '/portfolio-gym',

  // 5. Допомагає правильно завантажувати CSS та JS файли
  assetPrefix: '/portfolio-gym/',
};

export default nextConfig;