// pages/landing/LandingPage.js  (or app/landing/LandingPage/page.js)
import dynamic from "next/dynamic";

// Import your actual component dynamically and turn off SSR
const LandingPage = dynamic(() => import("../../components/LandingPage"), {
  ssr: false,
});

export default LandingPage;
