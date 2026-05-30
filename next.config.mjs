/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix: allowedDevOrigins must be a top-level option, NOT nested in 'experimental'
  allowedDevOrigins: ['10.192.74.237'],

  // Fix: Keep this empty or remove it unless you are intentionally ignoring build errors
  eslint: {
    ignoreDuringBuilds: true, 
  },
};

export default nextConfig;