/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // GLB/texture assets are served statically from /public and fetched
  // by the R3F loaders directly, so no image loader config is needed yet.
  experimental: {
    optimizePackageImports: ["three", "@react-three/drei"],
  },
};

export default nextConfig;
