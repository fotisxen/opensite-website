import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.ctfassets.net" },
      { protocol: "https", hostname: "onemenoo.com" },
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
