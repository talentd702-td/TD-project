/** @type {import('next').NextConfig} */
const nextConfig = {
    // Force fully dynamic rendering
    output: 'standalone',
  
    // Optional safety: ensure no static generation is attempted
    experimental: {
      appDir: true, // if you’re using the /app directory
    },
  };
  
  export default nextConfig;
  