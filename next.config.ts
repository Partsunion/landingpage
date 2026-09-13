import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "partsunion.de", pathname: "/product/**" }],
  },
};

export default nextConfig;
