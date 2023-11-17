import Navbar from "@/components/Navbar";
import HomeComponent from "@/components/Home";
import AboutComponent from "@/components/About";
import MapComponent from "@/components/Map";
import Footer from "@/components/Footer";

export default function Home() {
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
