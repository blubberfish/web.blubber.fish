import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/app/lilypad",
        destination: `${process.env.LILYPAD_MFE_HOST}`,
      },
      {
        source: "/app/lilypad/:path+",
        destination: `${process.env.LILYPAD_MFE_HOST}/:path+`,
      },
      {
        source: "/lilypad-static/:path+",
        destination: `${process.env.LILYPAD_MFE_HOST}/:path+`,
      },
    ];
  },
};

export default nextConfig;
