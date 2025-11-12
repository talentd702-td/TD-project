import dynamic from "next/dynamic";

// Import the renamed file
const LandingPage = dynamic(() => import("./LandingPage"), {
  ssr: false,  // ensures browser-only render
});

export default LandingPage;
