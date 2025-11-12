// pages/landing/index.js
import dynamic from "next/dynamic";

const LandingPage = dynamic(() => import("./LandingPage"), {
  ssr: false, // <--- disables server-side rendering for this page
});

export default LandingPage;
