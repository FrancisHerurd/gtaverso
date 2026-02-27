// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Desactiva ESLint en build (temporal)
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gtaverso.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.gtaverso.com',
        pathname: '/**',
      },
      // Si tu WordPress está en otro dominio temporal, añádelo aquí:
      // {
      //   protocol: 'https',
      //   hostname: 'tu-wordpress.com',
      //   pathname: '/**',
      // },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
}

export default nextConfig