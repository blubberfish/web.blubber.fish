import type { NextConfig } from "next";

const extendedMfeAssetRedirection = process.env.MFE_ASSETS === "extended";
const mfeConfig = {
  lilypad: [
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
      destination: extendedMfeAssetRedirection
        ? `${process.env.LILYPAD_MFE_HOST}/lilypad-static/:path+`
        : `${process.env.LILYPAD_MFE_HOST}/:path+`,
    },
  ],
};

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return Object.values(mfeConfig).flatMap((routes) => routes);
  },
};

export default nextConfig;
