"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Navbar from "./Navbar";
import { landCoverData } from "@/data/landCoverData";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Hero = () => {
  return (
    <div
      id="hero"
      className="min-h-[100vh] w-screen flex flex-col md:flex-row justify-center bg-no-repeat bg-cover items-center shadow-2xl shadow-purple-400 rounded-b-3xl px-3 md:px-0"
      style={{ backgroundImage: "url('/bg-images/balabac.jpg')" }}>
      <div className="h-full w-full flex flex-col items-center  text-center md:text-start md:items-start md:ml-48 md:mt-64">
        <div className=" py-5 w-full md:pl-10 md:pr-16 md:border-l-[0.5rem] md:border-purple-500 bg-transparent shadow backdrop-blur-[1rem] space-y-4 rounded-lg md:rounded-r-3xl border-t-4 border-pink-700 md:border-t-0">
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

const LandCoverCard = ({ title, description }) => (
  <li className="rounded-2xl rounded-t-md hover:scale-110 transition delay-75 duration-500 ease-in-out border-t-4 border-pink-700 p-6 bg-white shadow-lg backdrop-blur-[1rem] md:text-justify">
    <h2 className="text-sm md:text-base font-bold">{title}</h2>
    {/* <div className="hidden-description">
      <p className="">{description}</p>
    </div> */}
  </li>
);

const Content = () => {
  const router = useRouter();

  const center = [11.803, 122.563]; //122.563, 11.803
  return (
    <div id="content" className="py-20 space-y-12">
      <p className=" text-white text-justify i">
        The land cover of the Philippines is a diverse and vibrant tapestry of
        natural landscapes and human-made features that make this Southeast
        Asian archipelago a truly unique and beautiful country. Spanning over
        7,000 islands in the western Pacific Ocean, the Philippines boasts a
        wide range of land cover types, each contributing to its ecological,
        cultural, and economic richness.
      </p>
      <div className="flex flex-col space-y-4">
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6">
          {landCoverData.map((item, index) => (
            <LandCoverCard
              key={index}
              title={item.title}
              description={item.description}
            />
          ))}
        </ul>
      </div>
      <div className="flex flex-col md:flex-row w-full gap-x-10 gap-y-10 md:gap-y-0 py-10">
        <div className="w-full md:w-[50%] h-[46rem] drop-shadow-2xl ">
          <MapContainer
            center={center}
            zoom={5.5}
            scrollWheelZoom={false}
            className=" border-y-4 p-2 border-pink-700"
            style={{ height: "100%", width: "100%", borderRadius: "1rem" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </div>

        <p className="w-full md:w-[50%] flex flex-col text-justify text-white drop-shadow-2xl">
          The land cover of the Philippines is a diverse and captivating
          tapestry of natural beauty and human influence. This archipelagic
          nation, comprising 7,641 islands, is located in Southeast Asia and
          showcases an astonishing array of ecosystems, making it a unique and
          vibrant part of the world&apos;s natural heritage.
          <br />
          <br />
          One of the most prominent features of the Philippines&apos; land cover
          is its lush tropical rainforests, which occupy a significant portion
          of its total land area. These rainforests are teeming with a rich
          diversity of flora and fauna, many of which are endemic to the region.
          The canopies of these forests are a mosaic of different shades of
          green, punctuated by a wide variety of trees, vines, and epiphytes,
          creating an intricate and mesmerizing landscape.
          <br />
          <br />
          The country is also characterized by its extensive coastal areas, with
          picturesque beaches, coral reefs, and mangrove forests. The pristine
          white sand beaches and crystal-clear waters are not only a source of
          natural beauty but also a vital part of the Philippines&apos; tourism
          industry. Coral reefs harbor an extraordinary wealth of marine life,
          making them essential for biodiversity conservation.
          <br />
          <br />
          Mountainous terrain plays a significant role in the Philippines&apos;
          land cover as well. The country is home to several major mountain
          ranges, including the Cordillera Central and the Sierra Madre. These
          mountains are often covered in lush green forests, adding to the
          country&apos;s scenic charm. They also influence the climate and
          hydrology of the region, serving as the source of numerous rivers and
          watersheds that are essential for agriculture and water supply.
          <br />
          <br />
          Agricultural land covers a substantial portion of the Philippines,
          with rice paddies, coconut plantations, and other crops dotting the
          landscape. The fertile soil and favorable climate make the country an
          agricultural powerhouse, contributing to its economy and livelihoods
          of many of its residents.
          <br />
          <br />
          <span className="self-end">
            <button
              className="text-end underline hover:text-purple-500 transition delay-75 duration-500 ease-in-out"
              onClick={() => router.push("/map")}>
              Go to Maps
            </button>
          </span>
        </p>
      </div>
    </div>
  );
};

const HomeComponent = () => {
  return (
    <>
      <div>
        <Hero />
      </div>
      <div className="container mx-auto px-3 md:px-0">
        <Content />
      </div>
    </>
  );
};

export default HomeComponent;
