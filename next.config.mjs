/** @type {import('next').NextConfig} */
const nextConfig = {
    // Make everything dynamic at runtime — disables static optimization
    output: 'standalone',
    generateBuildId: async () => 'build',
    experimental: {
      // This key is stable in Next 15 for forcing runtime rendering
      dynamicIO: true,
    },
    // Force all pages to be rendered on demand instead of at build
    revalidate: 0,
  };
  
  export default nextConfig;
  