import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/why-is-my-pf-stuck",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
