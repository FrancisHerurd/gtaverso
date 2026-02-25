// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Permite imágenes desde cualquier URL HTTPS (ideal para WPGraphQL)
      },
      {
        protocol: "http",
        hostname: "**", 
      }
    ],
  },
};

export default nextConfig;