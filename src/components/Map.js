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
import Geometry from "ol/geom";
// import GeometryType from "ol/geom/GeometryType";
import LineString from "ol/geom";
import Polygon from "ol/geom";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Circle from "ol/geom";
import Draw from "ol/interaction/Draw.js";
import { getLength, getArea } from "ol/sphere";
import CircleStyle from "ol/style/Circle.js";
// import VectorSource from "ol/source/Vector";
import Head from "next/head";
import Navbar from "./Navbar";
import { Coordinate } from "ol/coordinate";
import { MapBrowserEvent } from "ol";
import { Control } from "ol/control";
import FullScreenControl2 from "ol/control/FullScreen";
import Feature from "ol";

import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import GeoJSON from "ol/format/GeoJSON.js";

import { toStringHDMS } from "ol/coordinate";
import { toLonLat } from "ol/proj";

import {
  formatLength,
  formatArea,
  newpopulateQueryTable,
  newaddRowHandlers,
  newaddGeoJsonToMap,
} from "@/tools/functions";

const MapComponent = () => {
  const mapTargetElement = useRef(null);
  const [map, setMap] = useState();
  const [featureInfoFlag, setFeatureInfoFlag] = useState(true);
  // const contentRef = useRef(null);
  // const [lengthFlag, setLengthFlag] = useState(false);
  // const [areaFlag, setAreaFlag] = useState(false);

  // const [geometryType, setGeometryType] = useState(GeometryType.LINE_STRING);
  // const [vectorSource, setVectorSource] = useState();

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

  const bingMapsAerialWithLabelsOnDemand = new TileLayer({
    title: "Aerial With Labels On Demand",
    type: "base",
    source: new BingMaps({
      key: "AsMcqtm-jc8We9M2m9Dq9K8c62I7jlwqVCQ4Hpv1mpVIk6u8ZhAmHuG6BgPwTEBn",
      imagerySet: "AerialWithLabelsOnDemand",
    }),
  });

  const bingMapsCanvasDark = new TileLayer({
    title: "Canvas Dark",
    type: "base",
    source: new BingMaps({
      key: "AsMcqtm-jc8We9M2m9Dq9K8c62I7jlwqVCQ4Hpv1mpVIk6u8ZhAmHuG6BgPwTEBn",
      imagerySet: "CanvasDark",
    }),
  });

  const baseLayers = new LayerGroup({
    title: "Base Maps",
    layers: [
      nonTile,
      osmTile,
      bingMapsAerialWithLabelsOnDemand,
      bingMapsCanvasDark,
      bingMapsAerial,
    ],
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

  const container = document.getElementById("popup");
  const closer = document.getElementById("popup-closer");

  const popup = new Overlay({
    element: document.getElementById("popup"), // Assuming you have an element with ID "popup"
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
  });

  useEffect(() => {
    const closer = document.getElementById("popup-closer");

    closer.onclick = function () {
      popup.setPosition(undefined);
      closer.blur();
      return false;
    };
  }, []);

  const source = new VectorSource();
  let vector = new VectorLayer({
    source: source,
    style: new Style({
      fill: new Fill({
        color: "rgba(255, 255, 255, 0.2)",
      }),
      stroke: new Stroke({
        color: "#ffcc33",
        width: 2,
      }),
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({
          color: "#ffcc33",
        }),
      }),
    }),
  });

  useEffect(() => {
    const mapID = mapTargetElement.current;
    const map = new Map({
      target: mapID,
      controls: [layerSwitcher, mousePosition, scaleControl],
      view: mapView,
      layers: [baseLayers, overlayLayers, vector],
      overlay: [popup],
    });
    map.setTarget(mapTargetElement.current || "");
    setMap(map);

    const container = document.getElementById("popup");
    const content = document.getElementById("popup-content");

    const handlePopupClick = (layer, propertyName, e) => {
      if (featureInfoFlag) {
        content.innerHTML = " "; // Clear any previous content
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
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((data) => {
              const feature = data.features[0];
              if (feature && feature.properties) {
                const props = feature.properties;
                console.log("props", props);

                content.innerHTML = Object.keys(props)
                  .map((key) => `<h2>${key}: </h2><p>${props[key]}</p>`)
                  .join("<br>");
                popup.setPosition(philippinesCoords);

                // popup.setPosition(e.coordinate);
              }
            })
            .catch((error) => {
              console.error("Error fetching feature info:", error);
              content.innerHTML = "Error fetching feature info";
              popup.setPosition(e.coordinate);
            });
        } else {
          popup.setPosition(undefined);
        }
      }
    };

    map.on("singleclick", function (e) {
      handlePopupClick(add_land_cover_ph, "DESCRIPT,AREA", e);
      handlePopupClick(add_butuan, "barangay,class,shape_area", e);
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
    const mapID = document.getElementById("map");

    setFeatureInfoFlag(!featureInfoFlag);

    if (!featureInfoFlag) {
      popup.setPosition(undefined);
    }
  };

  let lengthFlag = false;
  let areaFlag = false;
  let draw;

  const toggleLengthMeasure = (map) => {
    const mapID = document.getElementById("map");
    lengthFlag = !lengthFlag;

    if (lengthFlag) {
      map.removeInteraction(draw);
      addInteraction("LineString", map);
    } else {
      map.removeInteraction(draw);
      source.clear();
      const elements = document.getElementsByClassName(
        "ol-tooltip ol-tooltip-static"
      );
      while (elements.length > 0) elements[0].remove();
    }
  };

  const toggleAreaMeasure = (map) => {
    const mapID = document.getElementById("map");
    // setAreaFlag(!areaFlag);
    areaFlag = !areaFlag;

    if (areaFlag) {
      map.removeInteraction(draw);
      addInteraction("Polygon", map);
    } else {
      map.removeInteraction(draw);
      source.clear();
      const elements = document.getElementsByClassName(
        "ol-tooltip ol-tooltip-static"
      );
      while (elements.length > 0) elements[0].remove();
    }
  };

  let continuePolygonMsg =
    "Click to continue drawing the polygon, Double click to complete it.";
  let continuelineMsg =
    "Click to continue drawing the line, Double click to complete it.";

  const addInteraction = (geometryType, map) => {
    draw = new Draw({
      source: source,
      type: geometryType,
      style: new Style({
        fill: new Fill({
          color: "rgba(200, 200, 200, 0.6)",
        }),
        stroke: new Stroke({
          color: "#ffcc33",
          lineDash: [10, 10],
          width: 2,
        }),
        image: new CircleStyle({
          radius: 5,
          stroke: new Stroke({
            color: "rgba(0, 0, 0, 0.7)",
          }),
          fill: new Fill({
            color: "#ffcc33",
          }),
        }),
      }),
    });
    map.addInteraction(draw);

    createMeasureTooltip(map);
    createHelpTooltip(map);

    let sketch;

    let pointerMoveHandler = function (evt) {
      if (evt.dragging) {
        return;
      }
      let helpMsg = "Click to start drawing";
      if (sketch) {
        let geom = sketch.getGeometry();
      }
    };

    map.on("pointermove", pointerMoveHandler);

    draw.on("drawstart", function (evt) {
      sketch = evt.feature;
      let tooltipCoord = evt.Coordinate;
      sketch.getGeometry().on("change", function (evt) {
        let geom = evt.target;
        let output;
        if (geom.getType() === "Polygon") {
          output = formatArea(geom);
          tooltipCoord = geom.getInteriorPoint().getCoordinates();
        } else if (geom.getType() === "LineString") {
          output = formatLength(geom);
          tooltipCoord = geom.getLastCoordinate();
        }
        measureTooltipElement.innerHTML = output;
        measureTooltip.setPosition(tooltipCoord);
      });
    });

    draw.on("drawend", function () {
      measureTooltipElement.className = "ol-tooltip ol-tooltip-static";
      measureTooltip.setOffset([0, -7]);
      //unset sketch
      sketch = null;
      //unset tooltip so that a new one can be created
      measureTooltipElement = null;
      createMeasureTooltip(map);
    });
  };

  /** START FUNCTIONS (MEASUREMENT) **/

  let helpTooltipElement;
  let helpTooltip;

  let measureTooltipElement;
  let measureTooltip;

  function createHelpTooltip(map) {
    if (helpTooltipElement) {
      helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement("div");
    helpTooltipElement.className = "ol-tooltip hidden";
    helpTooltip = new Overlay({
      element: helpTooltipElement,
      offset: [15, 0],
      positioning: "center-left",
    });
    map.addOverlay(helpTooltip);
  }

  const createMeasureTooltip = (map) => {
    map.getViewport().addEventListener("mouseout", function () {
      helpTooltipElement.classList.add("hidden");
    });

    if (measureTooltipElement) {
      measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement("div");
    measureTooltipElement.className = "ol-tooltip ol-tooltip-measure";
    measureTooltip = new Overlay({
      element: measureTooltipElement,
      offset: [0, -15],
      positioning: "bottom-center",
    });
    map.addOverlay(measureTooltip);
  };

  /** END FUNCTIONS (MEASUREMENT) **/

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

  let geojson;
  let featureOverlay;
  let qryFlag = false;
  const toggleQry = (map) => {
    qryFlag = !qryFlag;
    console.log("qryFlag", qryFlag);
    console.log("geojson", geojson);

    if (qryFlag) {
      if (geojson) {
        geojson.getSource().clear();
        map.removeLayer(geojson);
      }
      if (featureOverlay) {
        featureOverlay.getSource.clear();
        map.removeLayer(featureOverlay);
      }

      // document.getElementById("attQueryDiv").style.display = "block";
      document.getElementById("attQueryDiv");

      let bolIdentify = false;

      addMapLayerList();
    } else {
      // document.getElementById("attQueryDiv").style.display = "none";
      // document.getElementById("attListDiv").style.display = "none";
      document.getElementById("attQueryDiv");
      document.getElementById("attListDiv");

      if (geojson) {
        geojson.getSource().clear();
        map.removeLayer(geojson);
      }
      if (featureOverlay) {
        featureOverlay.getSource.clear();
        map.removeLayer(featureOverlay);
      }
    }
  };

  const addMapLayerList = () => {
    document.addEventListener("DOMContentLoaded", function () {
      fetch(
        "http://localhost:8080/geoserver/ITE-18-WEBGIS/wfs?request=GetCapabilities"
      )
        .then((response) => response.text())
        .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
        .then((data) => {
          console.log("data", data);
          let select = document.getElementById("selectLayer");
          select.innerHTML += "<option class='ddindent' value=''></option>";
          let featureTypes = data.getElementsByTagName("FeatureType");
          for (let featureType of featureTypes) {
            let names = featureType.getElementsByTagName("Name");
            for (let name of names) {
              select.innerHTML +=
                "<option class='ddindent' value='" +
                name.textContent +
                "'>" +
                name.textContent +
                "</option>";
            }
          }
        });
    });
  };

  // useEffect(() => {
  //   const initializeMapLayerSelection = (map) => {
  //     document
  //       .getElementById("selectLayer")
  //       .addEventListener("change", function () {
  //         let select = document.getElementById("selectAttribute");
  //         while (select.options.length > 0) {
  //           select.remove(0);
  //         }
  //         let value_layer = this.value;

  //         fetch(
  //           "http://localhost:8080/geoserver/wfs?service=WFS&request=DescribeFeatureType&version=1.1.0&typeName=" +
  //             value_layer
  //         )
  //           .then((response) => {
  //             if (!response.ok) {
  //               console.error("Failed to fetch data.");
  //               return;
  //             }
  //             return response.text();
  //           })
  //           .then((xmlText) => {
  //             const parser = new DOMParser();
  //             const xmlDoc = parser.parseFromString(xmlText, "text/xml");
  //             const select = document.getElementById("selectAttribute");
  //             select.innerHTML = "";
  //             select.appendChild(new Option("", "", false, true));

  //             const sequences = xmlDoc.querySelectorAll("xsd\\:sequence");
  //             sequences.forEach((sequence) => {
  //               sequence
  //                 .querySelectorAll("xsd\\:element")
  //                 .forEach((element) => {
  //                   const value = element.getAttribute("name");
  //                   const type = element.getAttribute("type");
  //                   if (value !== "geom" && value !== "the_geom") {
  //                     select.appendChild(new Option(value, type, false, false));
  //                   }
  //                 });
  //             });
  //           })
  //           .catch((error) => {
  //             console.error("An error occurred:", error);
  //           });
  //       });

  //     document
  //       .getElementById("selectAttribute")
  //       .addEventListener("change", function () {
  //         let operator = document.getElementById("selectOperator");
  //         while (operator.options.length > 0) {
  //           operator.remove(0);
  //         }

  //         let value_type = this.value;
  //         let value_attribute = this.options[this.selectedIndex].text;

  //         operator.options[0] = new Option("Select operator", "");

  //         if (
  //           value_type == "xsd:short" ||
  //           value_type == "xsd:int" ||
  //           value_type == "xsd:double"
  //         ) {
  //           operator.options[1] = new Option("Greater than", ">");
  //           operator.options[2] = new Option("Less than", "<");
  //           operator.options[3] = new Option("Equal to", "=");
  //         } else if (value_type == "xsd:string") {
  //           operator.options[1] = new Option("Like", "Like");
  //           operator.options[2] = new Option("Equal to", "=");
  //         }
  //       });

  //     document
  //       .getElementById("attQryRun")
  //       .addEventListener("click", function () {
  //         map.set("isLoading", "YES");

  //         if (featureOverlay) {
  //           featureOverlay.getSource().clear();
  //           map.removeLayer(featureOverlay);
  //         }
  //         let layer = document.getElementById("selectLayer");
  //         let attribute = document.getElementById("selectAttribute");
  //         let operator = document.getElementById("selectOperator");
  //         let txt = document.getElementById("enterValue");

  //         if (layer.options.selectedIndex == 0) {
  //           alert("Select Layer");
  //         } else if (attribute.options.selectedIndex == -1) {
  //           alert("Select Attribute");
  //         } else if (operator.options.selectedIndex <= 0) {
  //           alert("Select operator");
  //         } else if (txt.value.length <= 0) {
  //           alert("Enter value");
  //         } else {
  //           let value_layer = layer.options[layer.selectedIndex].value;
  //           let value_attribute =
  //             attribute.options[attribute.selectedIndex].text;
  //           let value_operator = operator.options[operator.selectedIndex].value;
  //           let value_txt = txt.value;
  //           if (value_operator == "Like") {
  //             value_txt = "%25" + value_txt + "%25";
  //           } else {
  //             value_txt = value_txt;
  //           }
  //           let url =
  //             "http://localhost:8080/geoserver/ITE-18-WEBGIS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" +
  //             value_layer +
  //             "&CQL_FILTER=" +
  //             value_attribute +
  //             "+" +
  //             value_operator +
  //             "+'" +
  //             value_txt +
  //             "'&outputFormat=application/json";
  //           newaddGeoJsonToMap(url, map, geojson);
  //           newpopulateQueryTable(url, map);
  //           setTimeout(function () {
  //             newaddRowHandlers(url, map);
  //           }, 300);
  //           map.set("isLoading", "NO");
  //         }
  //       });
  //   };
  //   // Call the function to initialize the behavior
  //   initializeMapLayerSelection(map);
  // }, []);

  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function () {
      document
        .getElementById("selectLayer")
        .addEventListener("change", function () {
          let select = document.getElementById("selectAttribute");
          while (select.options.length > 0) {
            select.remove(0);
          }
          let value_layer = this.value;

          fetch(
            "http://localhost:8080/geoserver/wfs?service=WFS&request=DescribeFeatureType&version=1.1.0&typeName=" +
              value_layer
          )
            .then((response) => {
              if (!response.ok) {
                console.error("Failed to fetch data.");
                return;
              }
              return response.text();
            })
            .then((xmlText) => {
              const parser = new DOMParser();
              const xmlDoc = parser.parseFromString(xmlText, "text/xml");
              const select = document.getElementById("selectAttribute");
              select.innerHTML = "";
              select.appendChild(new Option("", "", false, true));

              const sequences = xmlDoc.querySelectorAll("xsd\\:sequence");
              sequences.forEach((sequence) => {
                sequence
                  .querySelectorAll("xsd\\:element")
                  .forEach((element) => {
                    const value = element.getAttribute("name");
                    const type = element.getAttribute("type");
                    if (value !== "geom" && value !== "the_geom") {
                      select.appendChild(new Option(value, type, false, false));
                    }
                  });
              });
            })
            .catch((error) => {
              console.error("An error occurred:", error);
            });
        });

      document
        .getElementById("selectAttribute")
        .addEventListener("change", function () {
          let operator = document.getElementById("selectOperator");
          while (operator.options.length > 0) {
            operator.remove(0);
          }

          let value_type = this.value;
          let value_attribute = this.options[this.selectedIndex].text;

          operator.options[0] = new Option("Select operator", "");

          if (
            value_type == "xsd:short" ||
            value_type == "xsd:int" ||
            value_type == "xsd:double"
          ) {
            operator.options[1] = new Option("Greater than", ">");
            operator.options[2] = new Option("Less than", "<");
            operator.options[3] = new Option("Equal to", "=");
          } else if (value_type == "xsd:string") {
            operator.options[1] = new Option("Like", "Like");
            operator.options[2] = new Option("Equal to", "=");
          }
        });

      document
        .getElementById("attQryRun")
        .addEventListener("click", function () {
          map.set("isLoading", "YES");

          if (featureOverlay) {
            featureOverlay.getSource().clear();
            map.removeLayer(featureOverlay);
          }
          let layer = document.getElementById("selectLayer");
          let attribute = document.getElementById("selectAttribute");
          let operator = document.getElementById("selectOperator");
          let txt = document.getElementById("enterValue");

          if (layer.options.selectedIndex == 0) {
            alert("Select Layer");
          } else if (attribute.options.selectedIndex == -1) {
            alert("Select Attribute");
          } else if (operator.options.selectedIndex <= 0) {
            alert("Select operator");
          } else if (txt.value.length <= 0) {
            alert("Enter value");
          } else {
            let value_layer = layer.options[layer.selectedIndex].value;
            let value_attribute =
              attribute.options[attribute.selectedIndex].text;
            let value_operator = operator.options[operator.selectedIndex].value;
            let value_txt = txt.value;
            if (value_operator == "Like") {
              value_txt = "%25" + value_txt + "%25";
            } else {
              value_txt = value_txt;
            }
            let url =
              "http://localhost:8080/geoserver/ITE-18-WEBGIS/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" +
              value_layer +
              "&CQL_FILTER=" +
              value_attribute +
              "+" +
              value_operator +
              "+'" +
              value_txt +
              "'&outputFormat=application/json";
            newaddGeoJsonToMap(url, map, geojson);
            newpopulateQueryTable(url, map);
            setTimeout(function () {
              newaddRowHandlers(url, map);
            }, 300);
            map.set("isLoading", "NO");
          }
        });
    });
  }, []);

  return (
    <>
      <div className="container mx-auto place-items-center">
        <Navbar />

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
          <div className="lengthButtonDiv">
            <button
              onClick={() => toggleLengthMeasure(map)}
              className={"myButton"}>
              <img
                src="../../images/controls/length.png"
                alt="Length"
                className="myButtonImage"
              />
            </button>
          </div>

          <div className="areaButtonDiv">
            <button
              onClick={() => toggleAreaMeasure(map)}
              className={"myButton"}>
              <img
                src="../../images/controls/area.png"
                alt="Area"
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
          <div className="qryButtonDiv">
            <button onClick={() => toggleQry(map)} className={"myButton"}>
              <img
                src="../../images/controls/attribute-query.png"
                alt="Attribute Query"
                className="myButtonImage"
              />
            </button>
          </div>
        </div>

        <div id="map" ref={mapTargetElement}></div>

        {/* <div id="popup-content"></div> */}
        <div id="popup" className="ol-popup">
          <a href="#" id="popup-closer" className="ol-popup-closer"></a>
          <div id="popup-content"></div>
        </div>
      </div>
    </>
  );
};
export default MapComponent;
