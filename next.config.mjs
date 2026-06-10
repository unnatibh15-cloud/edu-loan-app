/** @type {import('next').NextConfig} */
const nextConfig = {
  // Natively support local dev addresses while maintaining clean build stacks on production
  allowedDevOrigins: process.env.NODE_ENV === 'development' 
    ? ['10.223.171.237', 'localhost:3000'] 
    : []
};

export default nextConfig;