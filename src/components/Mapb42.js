"use client";

import { useEffect, useRef, useState } from "react";

import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";

import Map from "ol/Map";
import View from "ol/View";
import ImageWMS from "ol/source/ImageWMS";
import ImageLayer from "ol/layer/Image";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM.js";
import Overlay from "ol/Overlay";
import { Attribution, ScaleLine } from "ol/control";
import { fromLonLat } from "ol/proj";
import BingMaps from "ol/source/BingMaps.js";
import LayerGroup from "ol/layer/Group";
import MousePosition from "ol/control/MousePosition";
import { format } from "ol/coordinate";
import LayerSwitcher from "ol-layerswitcher";
import Head from "next/head";
import Navbar from "./Navbar";
import { Control } from "ol/control";
import FullScreenControl2 from "ol/control/FullScreen";

import { toStringHDMS } from "ol/coordinate";
import { toLonLat } from "ol/proj";

const MapComponent = () => {
  const mapTargetElement = useRef(null);
  const [map, setMap] = useState();
  const [featureInfoFlag, setFeatureInfoFlag] = useState(true);

  const butuanCityCoords = fromLonLat([125.568014, 8.8904]);
  const philippinesCoords = fromLonLat([122.563, 11.803]);

  const mapView = new View({
    center: philippinesCoords,
    zoom: 6.5,
  });

  const nonTile = new TileLayer({
    title: "None",
    type: "base",
    // visible: true,
  });

  const osmTile = new TileLayer({
    title: "OpenStreetMap",
    type: "base",
    // visible: true,
    source: new OSM(),
  });

  const bingMapsAerial = new TileLayer({
    title: "Aerial",
    type: "base",
    source: new BingMaps({
      key: "AsMcqtm-jc8We9M2m9Dq9K8c62I7jlwqVCQ4Hpv1mpVIk6u8ZhAmHuG6BgPwTEBn",
      imagerySet: "Aerial",
    }),
  });

  const baseLayers = new LayerGroup({
    title: "Base Maps",
    layers: [nonTile, osmTile, bingMapsAerial],
  });

  const add_butuan = new ImageLayer({
    title: "Butuan",
    source: new ImageWMS({
      url: "http://localhost:8080/geoserver/ITE-18-WEBGIS/wms",
      params: {
        LAYERS: "ITE-18-WEBGIS:projected_butuan_PostGIS",
        TILED: true,
      },
      serverType: "geoserver",
      visible: true,
    }),
  });

  const add_land_cover_ph = new ImageLayer({
    title: "Land Cover of the Philippines",
    source: new ImageWMS({
      url: "http://localhost:8080/geoserver/ITE-18-WEBGIS/wms",
      params: {
        LAYERS: "ITE-18-WEBGIS:LandCover_w84",
        TILED: true,
      },
      serverType: "geoserver",
      visible: true,
    }),
  });

  const overlayLayers = new LayerGroup({
    title: "Overlays",
    layers: [add_butuan, add_land_cover_ph],
  });

  const layerSwitcher = new LayerSwitcher({
    reverse: true,
  });

  const mousePosition = new MousePosition({
    className: "mousePosition",
    projection: "EPSG:4326",
    coordinateFormat: function (coordinate) {
      return format(coordinate, "{y},{x}", 6);
    },
  });

  const scaleControl = new ScaleLine({
    bar: true,
    text: true,
  });

  const popup = new Overlay({
    position: philippinesCoords,
    positioning: "center-center",
    element: document.getElementById("marker"),
    stopEvent: false,
  });

  useEffect(() => {
    const map = new Map({
      target: "map",
      controls: [layerSwitcher, mousePosition, scaleControl],
      view: mapView,
      layers: [baseLayers, overlayLayers],
      overlay: [popup], // Uncomment this line
    });
    map.addOverlay(popup);
    map.setTarget(mapTargetElement.current || "");
    setMap(map);

    const customPopover = document.getElementById("customPopover");
    const customPopoverContent = document.getElementById(
      "customPopoverContent"
    );

    map.on("click", function (evt) {
      const coordinate = evt.coordinate;
      const hdms = toStringHDMS(toLonLat(coordinate));
      popup.setPosition(coordinate);

      // Show the custom popover
      customPopover.style.display = "block";

      // Update the content of the custom popover
      customPopoverContent.textContent = hdms;
    });

    return () => map.setTarget("");
  }, []);

  const home = (map) => {
    const view = map.getView();
    const newCenter = philippinesCoords;
    view.setZoom(6.5);
    view.setCenter(newCenter);
  };

  const toggleFullScreen = (map) => {
    let fullScreenFlag = false;
    fullScreenFlag = !fullScreenFlag;
    const mapID = document.getElementById("map");

    if (mapID) {
      if (fullScreenFlag) {
        if (mapID.requestFullscreen) {
          mapID.requestFullscreen();
        } else if (mapID.mozRequestFullscreen) {
          mapID.mozRequestFullscreen();
        } else if (mapID.webkitRequestFullscreen) {
          mapID.webkitRequestFullscreen();
        } else if (mapID.msRequestFullscreen) {
          mapID.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }
  };

  const toggleFeatureInfo = (map) => {
    // const mapID = document.getElementById("map");
    // setFeatureInfoFlag(!featureInfoFlag);
    // if (!featureInfoFlag) {
    //   popup.setPosition(undefined);
    // }
  };

  const zoomIn = (map) => {
    const view = map.getView();
    const currentZoom = view.getZoom();
    const newZoom = currentZoom + 1;
    view.setZoom(newZoom);
  };

  const zoomOut = (map) => {
    const view = map.getView();
    const currentZoom = view.getZoom();
    const newZoom = currentZoom - 0.5;
    view.setZoom(newZoom);
  };

  return (
    <>
      {/* // <div className="container mx-auto relative">
    //   <Navbar /> */}

      {/* <div className="z-100"> */}
      <div id="marker"></div>
      <div id="customPopover" className="custom-popover">
        <div className="custom-popover-title">Welcome to OpenLayers</div>
        <div className="custom-popover-content">
          The location you clicked was:
        </div>
        <code
          id="customPopoverContent"
          className="custom-popover-content-code"></code>
      </div>
      {/* </div> */}
      <div className=" ">
        <div className="homeButtonDiv">
          <button onClick={() => home(map)} className="myButton">
            <img
              src="../../images/controls/home.png"
              alt="Home"
              className="myButtonImage"
            />
          </button>
        </div>
        <div className="fsButtonDiv">
          <button onClick={() => toggleFullScreen(map)} className="myButton">
            <img
              src="../../images/controls/fullscreen.png"
              alt="Fullscreen"
              className="myButtonImage"
            />
          </button>
        </div>
        <div className="featureInfoButtonDiv">
          <button
            onClick={() => toggleFeatureInfo(map)}
            className={` ${featureInfoFlag && "bg-blue-400"}`}>
            <img
              src="../../images/controls/featureInfo.png"
              alt="Feature Info"
              className="myButtonImage"
            />
          </button>
        </div>
        <div className="ziButtonDiv">
          <button onClick={() => zoomIn(map)} className="myButton">
            <img
              src="../../images/controls/zoom-in.png"
              alt="Zoom-in"
              className="myButtonImage"
            />
          </button>
        </div>

        <div className="zoButtonDiv">
          <button onClick={() => zoomOut(map)} className="myButton">
            <img
              src="../../images/controls/zoom-out.png"
              alt="Zoom-out"
              className="myButtonImage"
            />
          </button>
        </div>
      </div>

      <div id="map" ref={mapTargetElement} className="h-[100vh]"></div>

      {/* // </div> */}
    </>
  );
};
export default MapComponent;
