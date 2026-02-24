import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gtaverso.com", 
      },
      {
        protocol: "https",
        hostname: "www.gtaverso.com", 
      }
    ],
  },
};

export default nextConfig;