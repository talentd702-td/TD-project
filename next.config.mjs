/** @type {import('next').NextConfig} */
const nextConfig = {
    // Build in server (standalone) mode
    output: "standalone",
  
    // Optional: deterministic build id
    generateBuildId: async () => "build"
  };
  
  export default nextConfig;
  