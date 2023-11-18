"use client";

import React, { useRef } from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "./Navbar";
import { landCoverData } from "@/data/landCoverData";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

const Hero = () => {
  return (
    <div
      id="hero"
      className="h-[50dvh] md:h-[100vh] w-screen flex flex-col md:flex-row justify-center bg-no-repeat bg-cover items-center shadow-2xl shadow-purple-400 rounded-b-3xl px-3 md:px-0 bg-[url('/bg-images/balabac.jpg')]">
      <div className="h-full w-full flex flex-col items-center justify-center text-center md:text-start md:items-start md:ml-48 md:mt-64">
        <div className=" py-5 w-full md:pl-10 md:pr-16 md:border-l-[0.5rem] md:border-purple-500 bg-transparent shadow backdrop-blur-[1rem] space-y-4 rounded-lg md:rounded-r-3xl border-t-4 border-pink-700 md:border-t-0 justify-center items-center">
          <h2 className="text-xl md:text-2xl font-[400]">
            CARAGA STATE UNIVERSITY
          </h2>
          <h1 className="text-3xl md:text-[5rem] font-bold md:leading-[5rem]">
            The Philippines&apos; <br /> Land Cover
          </h1>
          <div className=" leading-tight">
            <p className="font-[600]">A WEB-GIS Project of ITE-18 GROUP 1</p>
            <p className="text-sm">
              Caraga State University - Main, Ampayon, Butuan City, Agusan del
              Norte, Philippines
            </p>
          </div>
        </div>
      </div>
      <p className="w-full pr-3 pb-3 text-white text-xs self-end items-end content-end justify-end place-self-end justify-self-end text-end hidden md:flex">
        Photo by: {""}
        <a
          href="
        instagram.com/cjtagupa"
          className=" font-bold">
          Cris Tagupa
        </a>
      </p>
    </div>
  );
};

const LandCoverCard = ({ title, description, img }) => (
  <li className=" w-64 md:w-96 rounded-2xl rounded-t-md hover:scale-110 transition delay-75 duration-500 ease-in-out border-t-4 border-pink-700 bg-white shadow-lg backdrop-blur-[1rem] md:text-justify no">
    <div
      className="relative h-[150px] md:h-[200px]"
      style={{
        backgroundImage: `url(${img})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}></div>

    <div className="p-6">
      <h2 className="text-sm md:text-base font-bold">{title}</h2>
      <p className="text-xs md:text-sm">{description}</p>
    </div>
  </li>
);

const Cards = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollLeft -= 300; // adjust scroll amount as needed
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollLeft += 300; // adjust scroll amount as needed
  };

  return (
    <div
      id="infocard"
      className="w-screen md:h-[100dvh] mt py-20 overflow-x-hidden flex flex-col justify-around content-center">
      <div className="mb-10 text-center container mx-auto px-3 md:px-0 text-white">
        <h1 className="text-xl md:text-4xl font-bold md:mb-5">
          Land Cover in the Philippines
        </h1>
        <p className=" text-white text-justify md:px-52 text-sm md:text-md">
          The land cover of the Philippines is a diverse and vibrant tapestry of
          natural landscapes and human-made features that make this Southeast
          Asian archipelago a truly unique and beautiful country. Spanning over
          7,000 islands in the western Pacific Ocean, the Philippines boasts a
          wide range of land cover types, each contributing to its ecological,
          cultural, and economic richness.
        </p>
      </div>

      <div
        style={{ position: "relative" }}
        className="flex items-center justify-center">
        <button
          className="z-50 text-[5rem] text-pink-700"
          style={{
            position: "absolute",
            // top: "50%",
            left: "10px",
            zIndex: 1000,
          }}
          onClick={scrollLeft}>
          {"<"}
        </button>

        <div
          ref={scrollContainerRef}
          className="relative flex overflow-x-auto overflow-y-hidden scrollbar-thin scrollbar-thumb-purple-100 scrollbar-track-purple-100 mt-4 space-x-4 p-4">
          <div className="w-auto flex gap-x-[25px]">
            {landCoverData.map((item, index) => (
              <LandCoverCard
                key={index}
                title={item.title}
                description={item.description}
                img={item.img}
              />
            ))}
          </div>
        </div>

        <button
          className="z-50 text-[5rem] text-pink-700"
          style={{
            position: "absolute",
            // top: "50%",
            right: "10px",
            zIndex: 1000,
          }}
          onClick={scrollRight}>
          {">"}
        </button>
      </div>
    </div>
  );
};

const HomeComponent = () => {
  return (
    <>
      <Hero />
      <Cards />
    </>
  );
};

export default HomeComponent;
