/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'csm.gtaverso.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;