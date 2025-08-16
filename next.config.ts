import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
   images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        port: "",       // leave empty if not using custom port
        pathname: "/**" // allow all paths
      },
    ],
  },
};

export default nextConfig;
