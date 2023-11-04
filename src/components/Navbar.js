"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const buttons = [
    {
      label: "Home",
      action: () => {
        router.push("/home");
      },
      path: "/home",
    },
    {
      label: "About",
      action: () => {
        router.push("/about");
      },
      path: "/about",
    },
    {
      label: "Map",
      action: () => {
        router.push("/map");
      },
      path: "/map",
    },
  ];

  let pageTitle, pageDescription, logoUrl;

  switch (pathname) {
    case "/home":
      pageTitle = "Home | WebGIS";
      pageDescription = "Home page of WebGIS";
      //   logoUrl = "lco-logo-enhanced.svg";
      break;
    case "/about":
      pageTitle = "About | WebGIS";
      pageDescription = "About page of WebGIS";
      break;
    case "/map":
      pageTitle = "Map | WebGIS";
      pageDescription = "Map page of WebGIS";
      break;
    default:
      pageTitle = "WebGIS";
      pageDescription = "WebGIS";
      break;
  }

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} key="desc" />
      {/* <link rel="icon" href={logoUrl} /> */}

      <div className="w-full z-50 flex font-Montserrat select-none my-5 ">
        <div className="w-full flex justify-end  px-5 font-Montserrat space-x-3 select-none">
          {buttons.map((button, index) => (
            <button
              className={`hover:scale-110 transition delay-75 duration-500 ease-in-out text-[18px] w-24 py-2 rounded-full text-white ${
                pathname === button.path
                  ? "bg-purple-500 text-white"
                  : "hover:bg-purple-300 hover:text-white"
              }`}
              key={index}
              onClick={button.action}>
              {button.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
