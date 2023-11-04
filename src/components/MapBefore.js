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
// import FullScreenControl2 from "ol/control/FullScreen";

class HomeControl extends Control {
  constructor() {
    const element = document.createElement("div");
    element.className = "homeButtonDiv";

    const button = document.createElement("button");
    button.className = "myButton";

    const img = document.createElement("img");
    img.src = "../../images/controls/home.png";
    img.alt = "Home";
    img.className = "myButtonImage";

    button.appendChild(img);
    element.appendChild(button);

    super({
      element: element,
    });

    button.addEventListener("click", () => {
      location.href = "index.html";
    });
  }
}

class FullScreenControl extends Control {
  constructor() {
    const element = document.createElement("div");
    element.className = "fsButtonDiv";

    const button = document.createElement("button");
    button.className = "myButton";

    const img = document.createElement("img");
    img.src = "../../images/controls/fullscreen.png";
    img.alt = "Fullscreen";
    img.className = "myButtonImage";

    button.appendChild(img);
    element.appendChild(button);

    super({
      element: element,
    });

    let fullScreenFlag = false;

    button.addEventListener("click", () => {
      button.classList.toggle("clicked");
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
    });
  }
}

class LengthControl extends Control {
  constructor() {
    const element = document.createElement("div");
    element.className = "lengthButtonDiv";

    const button = document.createElement("button");
    button.className = "myButton";

    const img = document.createElement("img");
    img.src = "../../images/controls/length.png";
    img.alt = "Length";
    img.className = "myButtonImage";

    button.appendChild(img);
    element.appendChild(button);

    super({
      element: element,
    });

    let lengthFlag = false;

    button.addEventListener("click", () => {
      button.classList.toggle("clicked");
      lengthFlag = !lengthFlag;
      // document.getElementById("map").style.cursor = "default";
      const mapID = document.getElementById("map");

      if (lengthFlag) {
        mapID.removeInteraction(draw);
        addInteraction("LineString");
      } else {
        mapID.removeInteraction(draw);
        source.clear();
        const elements = document.getElementsByClassName(
          "ol-tooltip ol-tooltip-static"
        );
        while (elements.length > 0) elements[0].remove();
      }
    });
  }
}

class AreaControl extends Control {
  constructor() {
    const element = document.createElement("div");
    element.className = "areaButtonDiv";

    const button = document.createElement("button");
    button.className = "myButton";

    const img = document.createElement("img");
    img.src = "../../images/controls/area.png";
    img.alt = "Area";
    img.className = "myButtonImage";

    button.appendChild(img);
    element.appendChild(button);

    super({
      element: element,
    });

    let areaFlag = false;

    button.addEventListener("click", () => {
      button.classList.toggle("clicked");
      areaFlag = !areaFlag;
      // document.getElementById("map").style.cursor = "default";
      const mapID = document.getElementById("map");

      if (areaFlag) {
        mapID.removeInteraction(draw);
        addInteraction("Polygon");
      } else {
        mapID.removeInteraction(draw);
        source.clear();
        const elements = document.getElementsByClassName(
          "ol-tooltip ol-tooltip-static"
        );
        while (elements.length > 0) elements[0].remove();
      }
    });
  }
}

class ZoomInControl extends Control {
  constructor() {
    const element = document.createElement("div");
    element.className = "ziButtonDiv";

    const button = document.createElement("button");
    button.className = "myButton";

    const img = document.createElement("img");
    img.src = "../../images/controls/zoom-in.png";
    img.alt = "Zoom-In";
    img.className = "myButtonImage";

    button.appendChild(img);
    element.appendChild(button);

    super({
      element: element,
    });

    let zoomInFlag = false;

    button.addEventListener("click", () => {
      button.classList.toggle("clicked");
      zoomInFlag = !zoomInFlag;
      const mapID = document.getElementById("map");

      if (zoomInFlag) {
        // document.getElementById("map").style.cursor = "zoom-in";
        mapID.addInteraction(zoomInInteraction);
      } else {
        mapID.removeInteraction(zoomInInteraction);
        // document.getElementById("map").style.cursor = "default";
      }
    });
  }
}

class ZoomOutControl extends Control {
  constructor() {
    const element = document.createElement("div");
    element.className = "zoButtonDiv";

    const button = document.createElement("button");
    button.className = "myButton";

    const img = document.createElement("img");
    img.src = "../../images/controls/zoom-out.png";
    img.alt = "Zoom-Out";
    img.className = "myButtonImage";

    button.appendChild(img);
    element.appendChild(button);

    super({
      element: element,
    });

    let zoomInFlag = false;

    button.addEventListener("click", () => {
      button.classList.toggle("clicked");
      zoomInFlag = !zoomInFlag;
      const mapID = document.getElementById("map");

      if (zoomInFlag) {
        // document.getElementById("map").style.cursor = "zoom-out";
        mapID.addInteraction(zoomOutInteraction);
      } else {
        mapID.removeInteraction(zoomOutInteraction);
        // document.getElementById("map").style.cursor = "default";
      }
    });
  }
}

const MapComponent = () => {
  const mapTargetElement = useRef(null);
  const [map, setMap] = useState();

  const homeControl = new HomeControl();
  const fullScreenControl = new FullScreenControl();
  const lengthControl = new LengthControl();
  const areaControl = new AreaControl();
  const zoomInControl = new ZoomInControl();
  const zoomOutControl = new ZoomOutControl();

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
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
  });

  const featureInfoFlag = true;
  function handlePopupClick(layer, propertyName, e) {
    const content = document.createElement("div");
    content.innerHTML = "Loading...";

    const resolution = mapView.getResolution();
    const projection = mapView.getProjection();

    const url = layer
      .getSource()
      .getFeatureInfoUrl(e.coordinate, resolution, projection, {
        INFO_FORMAT: "application/json",
        propertyName: propertyName,
      });

    if (url) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const feature = data.features[0];
          const props = feature.properties;
          content.innerHTML = Object.keys(props)
            .map((key) => `<h2>${key}: </h2><p>${props[key]}</p>`)
            .join("<br>");
          popup.setElement(content);
          popup.setPosition(e.coordinate);
        })
        .catch((error) => {
          content.innerHTML = "Error loading data";
          popup.setElement(content);
          popup.setPosition(e.coordinate);
        });
    } else {
      content.innerHTML = "No information available";
      popup.setElement(content);
      popup.setPosition(e.coordinate);
    }
  }

  useEffect(() => {
    const map = new Map({
      target: "map",
      id: "map",
      class: "map",
      controls: [
        layerSwitcher,
        mousePosition,
        scaleControl,
        homeControl,
        fullScreenControl,
        lengthControl,
        areaControl,
        zoomInControl,
        zoomOutControl,
      ],
      view: mapView,
      layers: [baseLayers, overlayLayers],
      overlay: [popup],
    });
    map.setTarget(mapTargetElement.current || "");
    setMap(map);

    map.on("singleclick", function (e) {
      handlePopupClick(add_butuan, "barangay,class,shape_area", e);
      handlePopupClick(add_land_cover_ph, "DESCRIPT,AREA", e);
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

      <div id="map" ref={mapTargetElement} className="h-[100vh]"></div>
      {/* // </div> */}
    </>
  );
};
export default MapComponent;
