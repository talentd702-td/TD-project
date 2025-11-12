/** @type {import('next').NextConfig} */
const nextConfig = {
    // run the app as a Node server bundle (server runtime)
    output: "standalone",
  
    // Prevent Next.js from failing builds due to linter errors
    eslint: {
      // ignore ESLint errors during the build step
      ignoreDuringBuilds: true
    },
  
    // deterministic build id (optional but sometimes helps caches)
    generateBuildId: async () => "build"
  };
  
  export default nextConfig;
  