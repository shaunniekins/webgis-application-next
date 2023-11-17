"use client";

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
    <div className=" bg-purple-900 w-screen rounded-t-3xl border-t-4 border-pink-700 px-8 lg:px-[200px] py-12">
      <div className="flex flex-col md:flex-row justify-between items-center 2xl:items-start gap-y-[20px] 2xl:gap-y-0 text-white">
        <h1 className=" font-bold">Philippines' Land Cover</h1>
        <div className="self-center 2xl:self-end flex gap-[24px]">
          <div className="hover:scale-125 transition delay-100 duration-500 ease-in-out">
            <LogoFacebook color={"#FFFFFF"} height="24px" width="24px" />
          </div>
          <div className="hover:scale-125 transition delay-100 duration-500 ease-in-out">
            <LogoInstagram color={"#FFFFFF"} height="24px" width="24px" />
          </div>
          <div className="hover:scale-125 transition delay-100 duration-500 ease-in-out">
            <LogoTwitter color={"#FFFFFF"} height="24px" width="24px" />
          </div>
          <div className="hover:scale-125 transition delay-100 duration-500 ease-in-out">
            <LogoYoutube color={"#FFFFFF"} height="24px" width="24px" />
          </div>
          <div className="hover:scale-125 transition delay-100 duration-500 ease-in-out">
            <LogoLinkedin color={"#FFFFFF"} height="24px" width="24px" />
          </div>
        </div>
      </div>
      <hr className="border border-white border-opacity-50 mt-[20px] mb-[50px]" />
      <div className="flex flex-col 2xl:flex-row 2xl:justify-between gap-y-[30px] 2xl:gap-y-0">
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
        <div className="flex flex-col gap-y-[20px] lg:gap-y-[50px] items-center 2xl:items-start mt-[40px] 2xl:mt-0">
          <p className="text-white text-xl font-medium">
            Subscribe to our newsletter.
          </p>
          <form
            action=""
            className="flex flex-col 2xl:flex-row gap-y-[10px] 2xl:gap-y-0 2xl:gap-x-[25px] items-center 2xl:items-start">
            <input
              type="email"
              className="w-[250px] sm:w-[357.14px] h-[50px] flex rounded-[10px] border border-stone-300 text-stone-300 text-base font-normal outline-none pl-3 bg-transparent"
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
            © {new Date().getFullYear()} Philippines' Land Cover
          </div>
        </div>
      </div>
    </div>
  );
};

const renderColumn = (title, items) => (
  <div className="flex-col 2xl:justify-start items-center 2xl:items-start gap-y-[15px] 2xl:gap-y-[18px] flex">
    <h4 className="text-white text-lg font-bold text-center">{title}</h4>
    <div className="flex-col justify-center items-center 2xl:items-start gap-3 flex">
      {items.map((item, index) => (
        <p key={index} className="text-gray-200 text-sm font-normal">
          {item}
        </p>
      ))}
    </div>
  </div>
);
export default Footer;
