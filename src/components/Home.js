"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import { landCoverData } from "@/data/landCoverData";

import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Marker,
  Popup,
  Rectangle,
  Circle,
  Polygon,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Hero = () => {
  return (
    <div
      id="hero"
      className="min-h-[100vh] w-screen flex bg-no-repeat bg-cover items-center "
      style={{ backgroundImage: "url('/bg-images/balabac.jpg')" }}>
      <div className="h-full w-full flex flex-col items-start ml-48 mt-64">
        <div className=" py-5 pl-10 pr-16 border-l-[0.5rem] border-purple-500 bg-transparent shadow backdrop-blur-[1rem] space-y-4 rounded-lg rounded-r-3xl">
          <h2 className=" text-2xl font-[400]">CARAGA STATE UNIVERSITY</h2>
          <h1 className="text-[5rem] font-bold leading-[5rem]">
            The Philippines' <br /> Land Cover
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
      <p className="w-full pr-3 pb-3 text-white text-xs self-end items-end content-end justify-end place-self-end justify-self-end text-end">
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
  <li className="rounded-2xl rounded-t-md hover:scale-110 transition delay-75 duration-500 ease-in-out border-t-4 border-pink-700 p-6 bg-white shadow-lg backdrop-blur-[1rem] text-justify">
    <h2 className="font-bold">{title}</h2>
    <p>{description}</p>
  </li>
);

const Content = () => {
  const [gridCols, setGridCols] = useState(3); // Default to 1 column

  const handleButtonClick = (cols) => {
    setGridCols(cols);
  };

  const center = [11.803, 122.563]; //122.563, 11.803
  return (
    <div id="content" className="py-20 space-y-12">
      <p className=" text-white text-justify">
        The land cover of the Philippines is a diverse and vibrant tapestry of
        natural landscapes and human-made features that make this Southeast
        Asian archipelago a truly unique and beautiful country. Spanning over
        7,000 islands in the western Pacific Ocean, the Philippines boasts a
        wide range of land cover types, each contributing to its ecological,
        cultural, and economic richness.
      </p>
      <div className="flex flex-col space-y-4">
        <ul className="flex gap-x-5 self-end">
          <li>
            <button
              className={gridCols === 1 ? "text-white" : ""}
              onClick={() => handleButtonClick(1)}>
              1
            </button>
          </li>
          <li>
            <button
              className={gridCols === 2 ? "text-white" : ""}
              onClick={() => handleButtonClick(2)}>
              2
            </button>
          </li>
          <li>
            <button
              className={gridCols === 3 ? "text-white" : ""}
              onClick={() => handleButtonClick(3)}>
              3
            </button>
          </li>
          <li>
            <button
              className={gridCols === 4 ? "text-white" : ""}
              onClick={() => handleButtonClick(4)}>
              4
            </button>
          </li>
        </ul>
        <ul className={`grid grid-cols-${gridCols} gap-6`}>
          {landCoverData.map((item, index) => (
            <LandCoverCard
              key={index}
              title={item.title}
              description={item.description}
            />
          ))}
        </ul>
      </div>
      <div className="flex w-full gap-x-10">
        <div className="w-[50%] h-[46rem]">
          <MapContainer
            center={center}
            zoom={5.5}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%", "border-radius": "1rem" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </MapContainer>
        </div>

        <p className="w-[50%] flex flex-col text-justify">
          The land cover of the Philippines is a diverse and captivating
          tapestry of natural beauty and human influence. This archipelagic
          nation, comprising 7,641 islands, is located in Southeast Asia and
          showcases an astonishing array of ecosystems, making it a unique and
          vibrant part of the world's natural heritage.
          <br />
          <br />
          One of the most prominent features of the Philippines' land cover is
          its lush tropical rainforests, which occupy a significant portion of
          its total land area. These rainforests are teeming with a rich
          diversity of flora and fauna, many of which are endemic to the region.
          The canopies of these forests are a mosaic of different shades of
          green, punctuated by a wide variety of trees, vines, and epiphytes,
          creating an intricate and mesmerizing landscape.
          <br />
          <br />
          The country is also characterized by its extensive coastal areas, with
          picturesque beaches, coral reefs, and mangrove forests. The pristine
          white sand beaches and crystal-clear waters are not only a source of
          natural beauty but also a vital part of the Philippines' tourism
          industry. Coral reefs harbor an extraordinary wealth of marine life,
          making them essential for biodiversity conservation.
          <br />
          <br />
          Mountainous terrain plays a significant role in the Philippines' land
          cover as well. The country is home to several major mountain ranges,
          including the Cordillera Central and the Sierra Madre. These mountains
          are often covered in lush green forests, adding to the country's
          scenic charm. They also influence the climate and hydrology of the
          region, serving as the source of numerous rivers and watersheds that
          are essential for agriculture and water supply.
          <br />
          <br />
          Agricultural land covers a substantial portion of the Philippines,
          with rice paddies, coconut plantations, and other crops dotting the
          landscape. The fertile soil and favorable climate make the country an
          agricultural powerhouse, contributing to its economy and livelihoods
          of many of its residents.
          <br />
          <br />
          <span className="text-end">Go to Maps</span>
        </p>
      </div>
    </div>
  );
};

const Footer = () => {
  return <></>;
};

const HomeComponent = () => {
  return (
    <div className="no-scrollbar overflow-y-auto h-[100dvh] w-screen flex flex-col items-center font-Montserrat select-none">
      <div className="container mx-auto w-full fixed top-0 flex justify-end z-50">
        <Navbar />
      </div>
      <div>
        <Hero />
      </div>
      <div className="container mx-auto">
        <Content />
      </div>
    </div>
  );
};

export default HomeComponent;
