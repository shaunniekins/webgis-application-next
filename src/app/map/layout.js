import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Home | WebGIS",
  description: "Home | WebGIS",
};

export default function HomeLayout({ children }) {
  return (
    <section>
      <div className="container mx-auto">
        <Navbar />
        {children}
      </div>
    </section>
  );
}
