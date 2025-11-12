import dynamic from "next/dynamic";

// Import from components folder now
const LandingPage = dynamic(
  () => import("../../src/components/landing/LandingPage"), 
  { ssr: false }
);

export default LandingPage;
