import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Home | WebGIS",
  description: "Home | WebGIS",
};

export default function HomeLayout({ children }) {
  return (
    <section className="no-scrollbar overflow-y-auto h-[100dvh] w-screen flex flex-col items-center font-Montserrat select-none">
      <div className="container mx-auto w-full fixed top-0 flex justify-end z-50">
        <Navbar />
      </div>
      {children}
      <Footer />
    </section>
  );
}
