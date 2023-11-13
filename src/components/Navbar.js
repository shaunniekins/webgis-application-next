"use client";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

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

  return (
    <>
      <div className="w-full z-50 flex font-Montserrat select-none my-5 ">
        <div className="w-full flex justify-between items-center px-5 font-Montserrat select-none">
          {/* <Image src="/logo.jpeg" width={60} height={60} alt="Logo" /> */}
          <div className="flex items-center justify-center bg-purple-900 text-white rounded-full py-2 px-4 shadow-lg">
            <h1 className="text-2xl font-bold">GROUP 1</h1>
          </div>
          <div className="space-x-3">
            {buttons.map((button, index) => (
              <button
                className={`hover:scale-110 transition delay-75 duration-500 ease-in-out text-[18px] w-24 py-2 rounded-full text-white ${
                  pathname === button.path
                    ? "bg-purple-900 text-white border-t-4 border-pink-700"
                    : "bg-purple-600 border-t-4 border-pink-700 text-gray-600 hover:bg-green-100 hover:text-black"
                }`}
                key={index}
                onClick={button.action}>
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
