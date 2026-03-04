/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'csm.gtaverso.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
    // ✅ Optimización automática de imágenes
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // ✅ NUEVO: Proxy de imágenes de WordPress
  async rewrites() {
    return [
      {
        source: '/wp-images/:path*',
        destination: 'https://csm.gtaverso.com/wp-content/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;