import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Static export for Firebase Hosting
  trailingSlash: true, // Recommended for static hosting
  images: {
    unoptimized: true, // Required for static export
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
