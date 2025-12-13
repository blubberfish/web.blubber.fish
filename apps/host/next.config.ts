import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/dashboard/lilypad",
        destination: `http://localhost:8000`,
      },
      {
        source: "/dashboard/lilypad/:path+",
        destination: `http://localhost:8000/:path+`,
      },
      {
        source: "/lilypad-assets/:path+",
        destination: `http://localhost:8000/lilypad-assets/:path+`,
      },
    ];
  },
};

export default nextConfig;
