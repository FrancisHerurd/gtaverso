import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Tu OVH WordPress (imágenes subidas al Media de WP)
      {
        protocol: "https",
        hostname: "gtaverso.com", // ← cambia por tu dominio OVH real
      },
    ],
  },
};

export default nextConfig;