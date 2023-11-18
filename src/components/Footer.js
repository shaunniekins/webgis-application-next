"use client";

import Image from "next/image";
import React from "react";
import {
  LogoFacebook,
  LogoInstagram,
  LogoTwitter,
  LogoYoutube,
  LogoLinkedin,
} from "react-ionicons";

const Footer = () => {
  return (
    <div className=" bg-purple-900 w-screen rounded-t-3xl border-t-4 border-pink-700 px-8 lg:px-[200px] py-5 md:py-12 text-sm md:text-md">
      <div className="flex flex-col md:flex-row justify-between items-center 2xl:items-start gap-y-[20px] 2xl:gap-y-0 text-white ">
        <h1 className=" font-bold">Philippines&apos; Land Cover</h1>
        <div className="self-center 2xl:self-end flex gap-[24px]">
          <div className="hover:scale-125 transition delay-100 duration-500 ease-in-out">
            <Image
              src="/facebook.png"
              width={24}
              height={24}
              alt="Facebook Logo"
              className="hover:scale-125 transition delay-100 duration-500 ease-in-out"
            />
          </div>
          <div className="hover:scale-125 transition delay-100 duration-500 ease-in-out">
            <Image
              src="/linkedin.png"
              width={24}
              height={24}
              alt="Facebook Logo"
              className="hover:scale-125 transition delay-100 duration-500 ease-in-out"
            />
          </div>
          <div className="hover:scale-125 transition delay-100 duration-500 ease-in-out">
            <Image
              src="/twitter.png"
              width={24}
              height={24}
              alt="Facebook Logo"
              className="hover:scale-125 transition delay-100 duration-500 ease-in-out"
            />
          </div>
          <div className="hover:scale-125 transition delay-100 duration-500 ease-in-out">
            <Image
              src="/youtube.png"
              width={24}
              height={24}
              alt="Facebook Logo"
              className="hover:scale-125 transition delay-100 duration-500 ease-in-out"
            />
          </div>
        </div>
      </div>
      <hr className="border border-white border-opacity-50 mt-[20px] mb-[20px] md:mb-[50px]" />
      <div className="flex flex-col 2xl:flex-row 2xl:justify-between gap-y-[15px] 2xl:gap-y-0 text-xs md:text-md">
        {renderColumn("Services", [
          "Landcover Searcher",
          "Location Locator",
          "Map Viever",
          "Landcover Statistics",
        ])}
        {renderColumn("About", ["What We Do", "Testimonials", "Blog", "FAQs"])}
        {renderColumn("Resources", [
          "Support",
          "Contact",
          "Manage Email References",
        ])}
        <div className="flex flex-col gap-y-[20px] lg:gap-y-[50px] items-center 2xl:items-start mt-[20px] 2xl:mt-0">
          <p className="text-white  font-medium text-md md:text-xl">
            Subscribe to our newsletter.
          </p>
          <form
            action=""
            className="flex flex-col 2xl:flex-row gap-y-[10px] 2xl:gap-y-0 2xl:gap-x-[25px] items-center 2xl:items-start">
            <input
              type="email"
              className="w-[250px] sm:w-[357.14px] h-[50px] flex rounded-[10px] border border-stone-300 text-stone-300 font-normal outline-none pl-3 bg-transparent text-base md:text-md"
              placeholder="email@example.com"
              required
            />
            <button className="w-[169.05px] h-[50px] px-[30px] py-3.5 bg-black rounded-full justify-center items-center gap-2.5 inline-flex text-white">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="flex justify-center  md:justify-end mt-[30px] ">
        <div className="flex justify-center 2xl:justify-start items-center gap-1">
          <div className="text-white text-xs font-normal">
            © {new Date().getFullYear()} Philippines&apos; Land Cover
          </div>
        </div>
      </div>
    </div>
  );
};

const renderColumn = (title, items) => (
  <div className="flex-col 2xl:justify-start items-center 2xl:items-start gap-y-[10px] 2xl:gap-y-[18px] flex ">
    <h4 className="text-white md:text-lg font-bold text-center">{title}</h4>
    <div className="flex-col justify-center items-center 2xl:items-start gap-3 flex">
      {items.map((item, index) => (
        <p key={index} className="text-gray-200 text-xs md:text-sm font-normal">
          {item}
        </p>
      ))}
    </div>
  </div>
);
export default Footer;
