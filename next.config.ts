import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/drift",
  assetPrefix: "/drift",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
