import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Home | WebGIS",
  description: "Home | WebGIS",
};

export default function HomeLayout({ children }) {
  return (
    <div className="no-scrollbar overflow-y-auto h-[100dvh] w-screen flex flex-col items-center font-Montserrat select-none">
      <section className="container mx-auto h-[100dvh] flex flex-col px-3 md:px-0 w-full overflow-y-auto">
        <Navbar />
        {children}
      </section>
      <Footer />
    </div>
  );
}
