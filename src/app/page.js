import Navbar from "@/components/Navbar";
import HomeComponent from "@/components/Home";
import AboutComponent from "@/components/About";
import Footer from "@/components/Footer";

import dynamic from "next/dynamic";

export default function Home() {
  const MapComponent = dynamic(() => import("@/components/Map"), {
    ssr: false,
  });

  return (
    <>
      <div className="container mx-auto w-full fixed top-0 flex justify-end z-50">
        <Navbar />
      </div>
      <div>
        <HomeComponent />
        <AboutComponent />
      </div>
      <div className="container mx-auto">
        <MapComponent />
      </div>

      <Footer />
    </>
  );
}
