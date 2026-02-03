import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/Canis-Alpha" : "",
  assetPrefix: isProd ? "/Canis-Alpha/" : "",
};

export default nextConfig;
