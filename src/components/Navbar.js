"use client";
import { useEffect, useState } from "react";

const NavItem = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`hover:scale-110  transition delay-75 duration-500 ease-in-out text-[18px] w-24 py-2 rounded-full text-white ${
      active
        ? "bg-purple-900 text-white border-t-4 border-pink-700"
        : "bg-purple-600 border-t-4 border-pink-700 text-gray-600 hover:bg-green-100 hover:text-black"
    }`}>
    <p>{label}</p>
  </button>
);

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHero, setIsHero] = useState(true);
  const [isAbout, setIsAbout] = useState(false);
  const [isMap, setIsMap] = useState(false);

  const [activeSection, setActiveSection] = useState("hero");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }

    if (sectionId === "hero") {
      setIsHero(true);
      setIsAbout(false);
      setIsMap(false);
      console.log("hero");
    }

    if (sectionId === "about") {
      setIsHero(false);
      setIsAbout(true);
      setIsMap(false);
      console.log("about");
    }

    if (sectionId === "map") {
      setIsHero(false);
      setIsAbout(false);
      setIsMap(true);
    }

    toggleMobileMenu();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroSection = document.getElementById("hero");
      const infoSection = document.getElementById("infocard");
      const aboutSection = document.getElementById("about");
      const mapSection = document.getElementById("map");

      if (scrollY >= heroSection.offsetTop && scrollY < infoSection.offsetTop) {
        setActiveSection("hero");
      } else if (
        scrollY >= infoSection.offsetTop &&
        scrollY < mapSection.offsetTop
      ) {
        setActiveSection("about");
      } else if (scrollY >= aboutSection.offsetTop) {
        setActiveSection("map");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="w-full z-50 flex font-Montserrat select-none my-5 ">
        <div className="w-full flex justify-center md:justify-between items-center px-5 font-Montserrat select-none">
          {/* <Image src="/logo.jpeg" width={60} height={60} alt="Logo" /> */}
          <div className="hidden md:flex items-center justify-center bg-purple-900 text-white rounded-full py-2 px-4 shadow-lg">
            <h1 className="text-2xl font-bold">GROUP 1</h1>
          </div>
          <div className="space-x-3">
            <NavItem
              label="Home"
              active={activeSection === "hero"}
              onClick={() => handleScrollToSection("hero")}
            />
            <NavItem
              label="About"
              active={activeSection === "about"}
              onClick={() => handleScrollToSection("about")}
            />
            <NavItem
              label="Map"
              active={activeSection === "map"}
              onClick={() => handleScrollToSection("map")}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
