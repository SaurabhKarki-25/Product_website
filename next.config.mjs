/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
   images: {
    domains: ["images.pexels.com"],  // allow product images
  },
};


module.exports = nextConfig;


export default nextConfig;
