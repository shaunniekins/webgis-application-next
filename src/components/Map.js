"use client";

// React imports
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

// OpenLayers imports
import "ol/ol.css";
import "ol-layerswitcher/dist/ol-layerswitcher.css";
import Map from "ol/Map";
import View from "ol/View";
import ImageWMS from "ol/source/ImageWMS";
import ImageLayer from "ol/layer/Image";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM.js";
import Overlay from "ol/Overlay";
import { ScaleLine } from "ol/control";
import { fromLonLat } from "ol/proj";
import BingMaps from "ol/source/BingMaps.js";
import LayerGroup from "ol/layer/Group";
import MousePosition from "ol/control/MousePosition";
import { format } from "ol/coordinate";
import LayerSwitcher from "ol-layerswitcher";
import Style from "ol/style/Style";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Draw from "ol/interaction/Draw.js";
import CircleStyle from "ol/style/Circle.js";
import VectorLayer from "ol/layer/Vector.js";
import VectorSource from "ol/source/Vector.js";
import { transformExtent } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";

// Local imports
import { formatLength, formatArea } from "@/tools/formatFunction";

const MapComponent = () => {
  // Refs
  const mapTargetElement = useRef(null);

  // Map state
  const [map, setMap] = useState();
  const [mapVal, setMapVal] = useState(null);

  // Toggle states
  const [toggleFullScreen, setToggleFullScreen] = useState(false);
  const [toggleFeatureInfo, setToggleFeatureInfo] = useState(false);
  const [toggleQuery, setToggleQuery] = useState(false);

  // Measurement states
  const [lengthFlag, setLengthFlag] = useState(false);
  const [areaFlag, setAreaFlag] = useState(false);
  const [draw, setDraw] = useState(null);

  // Query states
  const [currentQryLayer, setCurrentQryLayer] = useState(null);
  const [propsValue, setPropsValue] = useState([]);

  // Region data states
  const [regionsData, setRegionsData] = useState([]);
  const [provincesData, setProvincesData] = useState([]);
  const [municipalitiesData, setMunicipalitiesData] = useState([]);

  // Selected region states
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState("");

  // Coordinates
  const butuanCityCoords = fromLonLat([125.568014, 8.8904]);
  const philippinesCoords = fromLonLat([122.563, 11.803]);

  const mapView = useMemo(
    () =>
      new View({
        center: philippinesCoords,
        zoom: 6,
      }),
    [philippinesCoords]
  );

  const nonTile = new TileLayer({
    title: "None",
    type: "base",
  });

  const osmTile = new TileLayer({
    title: "OpenStreetMap",
    type: "base",
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

  const add_municipalities_ph = new ImageLayer({
    title: "Municipalities of the Philippines",
    source: new ImageWMS({
      url: "http://localhost:8080/geoserver/ITE-18-WEBGIS/wms",
      params: {
        LAYERS: "ITE-18-WEBGIS:Municipalities",
        TILED: true,
      },
      serverType: "geoserver",
      visible: true,
    }),
  });

  const overlayLayers = new LayerGroup({
    title: "Overlays",
    layers: [add_butuan, add_municipalities_ph, add_land_cover_ph],
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
    try {
      const mapID = mapTargetElement.current;
      const map = new Map({
        target: mapID,
        controls: [layerSwitcher, mousePosition, scaleControl],
        view: mapView,
        layers: [baseLayers, overlayLayers, vector],
      });
      map.setTarget(mapTargetElement.current || "");
      setMap(map);

      const fetchFeatureInfo = async (url) => {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const feature = data.features[0];
        if (feature && feature.properties) {
          return feature.properties;
        }
        return null;
      };

      const handlePopupClick = async (layers, e) => {
        if (!e || !e.coordinate) {
          console.error("Invalid event:", e);
          return;
        }

        const resolution = mapView.getResolution();
        const projection = mapView.getProjection();

        const fetchPromises = layers.map(({ layer, propertyName }) => {
          const url = layer
            .getSource()
            .getFeatureInfoUrl(e.coordinate, resolution, projection, {
              INFO_FORMAT: "application/json",
              propertyName: propertyName,
            });

          if (url) {
            return fetchFeatureInfo(url);
          }
          return Promise.resolve(null);
        });

        const results = await Promise.all(fetchPromises);
        const props = results.reduce(
          (acc, result) => ({ ...acc, ...result }),
          {}
        );

        setPropsValue(props);
      };

      map.on("singleclick", function (e) {
        handlePopupClick(
          [
            { layer: add_land_cover_ph, propertyName: "DESCRIPT,AREA" },
            { layer: add_municipalities_ph, propertyName: "Mun_Name,Pro_Name" },
            { layer: add_butuan, propertyName: "barangay,class,shape_area" },
          ],
          e
        );
      });

      return () => map.setTarget("");
    } catch (error) {
      console.error("Error creating map:", error);
    }
  }, []);

  const fetchRegionsData = async () => {
    const url = "http://localhost:8080/geoserver/ITE-18-WEBGIS/wfs";

    const params = {
      service: "WFS",
      version: "1.0.0",
      request: "GetFeature",
      typeName: "ITE-18-WEBGIS:Municipalities",
      propertyName: "Reg_Name",
      outputFormat: "application/json",
    };

    const query = new URLSearchParams(params).toString();
    const fullUrl = `${url}?${query}`;

    try {
      const response = await fetch(fullUrl);
      const data = await response.json();
      const fetchedRegions = data.features.map(
        (feature) => feature.properties.Reg_Name
      );
      setRegionsData([...new Set(fetchedRegions)]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchProvincesData = async (selectedRegion) => {
    const url = "http://localhost:8080/geoserver/ITE-18-WEBGIS/wfs";

    const params = {
      service: "WFS",
      version: "1.0.0",
      request: "GetFeature",
      typeName: "ITE-18-WEBGIS:Municipalities",
      propertyName: "Pro_Name",
      outputFormat: "application/json",
      CQL_FILTER: `Reg_Name='${selectedRegion}'`,
    };

    const query = new URLSearchParams(params).toString();
    const fullUrl = `${url}?${query}`;

    try {
      const response = await fetch(fullUrl);

      const data = await response.json();
      const fetchedProvinces = data.features.map(
        (feature) => feature.properties.Pro_Name
      );
      setProvincesData([...new Set(fetchedProvinces)]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchMunicipalitiesData = async (selectedProvince) => {
    const url = "http://localhost:8080/geoserver/ITE-18-WEBGIS/wfs";

    const params = {
      service: "WFS",
      version: "1.0.0",
      request: "GetFeature",
      typeName: "ITE-18-WEBGIS:Municipalities",
      propertyName: "Mun_Name",
      outputFormat: "application/json",
      CQL_FILTER: `Pro_Name='${selectedProvince}'`,
    };

    const query = new URLSearchParams(params).toString();
    const fullUrl = `${url}?${query}`;

    try {
      const response = await fetch(fullUrl);

      const data = await response.json();
      const fetchedMunicipalites = data.features.map(
        (feature) => feature.properties.Mun_Name
      );
      setMunicipalitiesData([...new Set(fetchedMunicipalites)]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchRegionsData();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      fetchProvincesData(selectedRegion);
      setSelectedProvince(""); // Reset selected province when region changes
      setSelectedMunicipality(""); // Reset selected municipality when region changes
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedProvince) {
      fetchMunicipalitiesData(selectedProvince);
      setSelectedMunicipality(""); // Reset selected municipality when province changes
    }
  }, [selectedProvince]);

  const getMunicipalityCoordinates = async (map) => {
    const url = "http://localhost:8080/geoserver/ITE-18-WEBGIS/wfs";

    const params = {
      service: "WFS",
      version: "1.0.0",
      request: "GetFeature",
      propertyName: "the_geom",
      typeName: "ITE-18-WEBGIS:Municipalities",
      outputFormat: "application/json",
      CQL_FILTER: `Mun_Name='${selectedMunicipality}'`,
    };

    const query = new URLSearchParams(params).toString();
    const fullUrl = `${url}?${query}`;

    const response = await fetch(fullUrl);
    const data = await response.json();

    try {
      const municipality = data.features[0];
      const geometry = municipality.geometry;

      const format = new GeoJSON();
      const geomObj = format.readGeometry(geometry);
      const bbox = geomObj.getExtent();
      const extent = transformExtent(
        bbox,
        "EPSG:4326",
        map.getView().getProjection()
      );

      var pPath = {
        type: "Polygon",
        coordinates: geometry.coordinates[0],
      };

      var fPath = {
        type: "Feature",
        geometry: pPath,
      };

      var svPath = new VectorSource({
        features: new GeoJSON().readFeatures(fPath, {
          featureProjection: map.getView().getProjection(),
        }),
      });

      var lvPath = new VectorLayer({
        source: svPath,
        style: new Style({
          fill: new Fill({
            color: "rgba(0, 0, 0, 0.2)",
          }),
          stroke: new Stroke({
            color: "#000000",
            width: 8,
          }),
        }),
      });

      if (currentQryLayer) {
        var layers = map.getLayers().getArray();
        for (var i = layers.length - 1; i >= 0; i--) {
          if (layers[i] === currentQryLayer) {
            map.removeLayer(layers[i]);
            break;
          }
        }
      }

      map.addLayer(lvPath);
      setCurrentQryLayer(lvPath);

      map.renderSync();

      map.getView().fit(extent, { duration: 1590, maxZoom: 11 });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const toggleOffQry = useCallback(() => {
    if (!toggleQuery) {
      setSelectedRegion("");
      setSelectedProvince("");
      setSelectedMunicipality("");

      if (currentQryLayer) {
        var layers = map.getLayers().getArray();
        for (var i = layers.length - 1; i >= 0; i--) {
          if (layers[i] === currentQryLayer) {
            map.removeLayer(layers[i]);
            break;
          }
        }
      }
    } else {
      setLengthFlag(false);
      setToggleFeatureInfo(false);
      setAreaFlag(false);

      setPropsValue([]);
      if (draw) {
        map.removeInteraction(draw);
        setDraw(null);
      }
      const elements = document.getElementsByClassName(
        "ol-tooltip ol-tooltip-static"
      );
      while (elements.length > 0) elements[0].remove();
    }
  }, []);

  useEffect(() => {
    toggleOffQry();
  }, [toggleQuery]);

  const home = (map) => {
    const view = map.getView();
    const newCenter = philippinesCoords;
    view.setZoom(6);
    view.setCenter(newCenter);
  };

  useEffect(() => {
    const mapID = document.getElementById("map");

    const handleFullScreenChange = () => {
      if (document.fullscreenElement) {
        setToggleFullScreen(true);
      } else {
        setToggleFullScreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);

    if (mapID) {
      if (toggleFullScreen) {
        if (mapID.requestFullscreen) {
          mapID.requestFullscreen();
        } else if (mapID.mozRequestFullscreen) {
          /* Firefox */
          mapID.mozRequestFullscreen();
        } else if (mapID.webkitRequestFullscreen) {
          /* Chrome, Safari and Opera */
          mapID.webkitRequestFullscreen();
        } else if (mapID.msRequestFullscreen) {
          /* IE/Edge */
          mapID.msRequestFullscreen();
        }
      } else if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          /* Firefox */
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          /* Chrome, Safari and Opera */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          /* IE/Edge */
          document.msExitFullscreen();
        }
      }
    }

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, [toggleFullScreen]);

  const handleToggleFeatureInfo = () => {
    setToggleFeatureInfo(!toggleFeatureInfo);
    setLengthFlag(false);
    setAreaFlag(false);
    setPropsValue([]);
    setToggleQuery(false);

    if (currentQryLayer) {
      var layers = map.getLayers().getArray();
      for (var i = layers.length - 1; i >= 0; i--) {
        if (layers[i] === currentQryLayer) {
          map.removeLayer(layers[i]);
          break;
        }
      }
    }
    if (draw) {
      map.removeInteraction(draw);
      setDraw(null);
    }
    const elements = document.getElementsByClassName(
      "ol-tooltip ol-tooltip-static"
    );
    while (elements.length > 0) elements[0].remove();
  };

  const toggleLengthMeasure = (map) => {
    if (lengthFlag) {
      setLengthFlag(false);
      if (draw) {
        map.removeInteraction(draw);
        setDraw(null);
      }
      const elements = document.getElementsByClassName(
        "ol-tooltip ol-tooltip-static"
      );
      while (elements.length > 0) elements[0].remove();
    } else {
      setLengthFlag(true);
      setToggleFeatureInfo(false);
      setAreaFlag(false);
      setToggleQuery(false);

      if (currentQryLayer) {
        var layers = map.getLayers().getArray();
        for (var i = layers.length - 1; i >= 0; i--) {
          if (layers[i] === currentQryLayer) {
            map.removeLayer(layers[i]);
            break;
          }
        }
      }

      if (draw) {
        map.removeInteraction(draw);
        setDraw(null);
      }
      source.clear();
      const elements = document.getElementsByClassName(
        "ol-tooltip ol-tooltip-static"
      );
      while (elements.length > 0) elements[0].remove();
      addInteraction("LineString", map);
    }
  };

  const toggleAreaMeasure = (map) => {
    if (areaFlag) {
      setAreaFlag(false);
      if (draw) {
        map.removeInteraction(draw);
        setDraw(null);
      }
      const elements = document.getElementsByClassName(
        "ol-tooltip ol-tooltip-static"
      );
      while (elements.length > 0) elements[0].remove();
    } else {
      setAreaFlag(true);
      setToggleFeatureInfo(false);
      setLengthFlag(false);
      setToggleQuery(false);

      if (currentQryLayer) {
        var layers = map.getLayers().getArray();
        for (var i = layers.length - 1; i >= 0; i--) {
          if (layers[i] === currentQryLayer) {
            map.removeLayer(layers[i]);
            break;
          }
        }
      }

      if (draw) {
        map.removeInteraction(draw);
        setDraw(null);
      }
      source.clear();
      const elements = document.getElementsByClassName(
        "ol-tooltip ol-tooltip-static"
      );
      while (elements.length > 0) elements[0].remove();
      addInteraction("Polygon", map);
    }
  };

  const addInteraction = (geometryType, map) => {
    const newDraw = new Draw({
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
    setDraw(newDraw);
    setMapVal(map);
    map.addInteraction(newDraw);
  };

  useEffect(() => {
    if (mapVal) {
      createMeasureTooltip(mapVal);
      createHelpTooltip(mapVal);

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

      mapVal.on("pointermove", pointerMoveHandler);

      if ((areaFlag || lengthFlag) && draw) {
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
          createMeasureTooltip(mapVal);
        });
      }
      return () => {
        if (helpTooltip) {
          mapVal.removeOverlay(helpTooltip);
          if (helpTooltipElement) {
            helpTooltipElement.parentNode.removeChild(helpTooltipElement);
          }
        }

        if (measureTooltip) {
          mapVal.removeOverlay(measureTooltip);
          if (measureTooltipElement) {
            measureTooltipElement.parentNode.removeChild(measureTooltipElement);
          }
        }
      };
    }
  }, [areaFlag, lengthFlag, mapVal]);

  /** START FUNCTIONS (MEASUREMENT) **/

  let helpTooltipElement;
  let helpTooltip;

  let measureTooltipElement;
  let measureTooltip;

  const createHelpTooltip = (map) => {
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
  };

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

  return (
    <div
      id="map"
      className="py-20 h-[100dvh] w-full flex flex-col justify-around content-center items-center text-black">
      <div className="mb-10 text-center text-white">
        <h1 className="text-xl md:text-4xl font-bold md:mb-5">The Map</h1>
        <p className=" text-white text-justify md:px-52 text-sm md:text-md">
          Different colors represent different type of landcover.
        </p>
      </div>
      <div
        className="w-full h-full overflow-hidden relative rounded-lg shadow-purple-400 shadow-2xl border-y-4 border-pink-700 p-2"
        ref={mapTargetElement}>
        <div className="flex flex-col absolute z-50 mt-3 ml-2 gap-2">
          <div className="flex gap-1">
            <button
              onClick={() => home(map)}
              className="z-40 bg-purple-500 font-bold h-8 w-8 rounded-sm border-none grid place-items-center hover:bg-green-100">
              <Image
                width={20}
                height={20}
                src="/images/controls/home.png"
                alt="Home"
                className="brightness-0 align-middle"
              />
            </button>
            <button
              onClick={() => setToggleFullScreen(!toggleFullScreen)}
              className={`z-40 bg-purple-500 font-bold h-8 w-8 rounded-sm border-none grid place-items-center hover:bg-green-100 ${
                toggleFullScreen && "bg-blue-100"
              }`}>
              <Image
                width={20}
                height={20}
                src="/images/controls/fullscreen.png"
                alt="Fullscreen"
                className=" brightness-0 align-middle"
              />
            </button>
            <button
              onClick={() => handleToggleFeatureInfo()}
              className={`${
                toggleFeatureInfo ? "bg-green-100" : "bg-purple-500"
              } z-40 font-bold h-8 w-8 rounded-sm border-none grid place-items-center hover:bg-green-100`}>
              <Image
                width={20}
                height={20}
                src="/images/controls/featureInfo.png"
                alt="Feature Info"
                className="brightness-0 align-middle"
              />
            </button>
            <button
              onClick={() => toggleLengthMeasure(map)}
              className={`${
                lengthFlag ? "bg-green-100" : "bg-purple-500"
              } z-40 font-bold h-8 w-8 rounded-sm border-none grid place-items-center hover:bg-green-100`}>
              <Image
                width={20}
                height={20}
                src="/images/controls/length.png"
                alt="Length"
                className="brightness-0 align-middle"
              />
            </button>
            <button
              onClick={() => toggleAreaMeasure(map)}
              className={`${
                areaFlag ? "bg-green-100" : "bg-purple-500"
              } z-40 font-bold h-8 w-8 rounded-sm border-none grid place-items-center hover:bg-green-100`}>
              <Image
                width={20}
                height={20}
                src="/images/controls/area.png"
                alt="Area"
                className="brightness-0 align-middle"
              />
            </button>
            <button
              onClick={() => zoomIn(map)}
              className="z-40 bg-purple-500 font-bold h-8 w-8 rounded-sm border-none grid place-items-center hover:bg-green-100">
              <Image
                width={20}
                height={20}
                src="/images/controls/zoom-in.png"
                alt="Zoom-in"
                className="brightness-0 align-middle"
              />
            </button>
            <button
              onClick={() => zoomOut(map)}
              className="z-40 bg-purple-500 font-bold h-8 w-8 rounded-sm border-none grid place-items-center hover:bg-green-100">
              <Image
                width={20}
                height={20}
                src="/images/controls/zoom-out.png"
                alt="Zoom-out"
                className="brightness-0 align-middle"
              />
            </button>
            <button
              onClick={() => setToggleQuery(!toggleQuery)}
              className={`${
                toggleQuery ? "bg-green-100" : "bg-purple-500"
              } z-40 font-bold h-8 w-8 rounded-sm border-none grid place-items-center hover:bg-green-100`}>
              <Image
                width={20}
                height={20}
                src="/images/controls/attribute-query.png"
                alt="Attribute Query"
                className="brightness-0 align-middle"
              />
            </button>
          </div>
          {toggleFeatureInfo && propsValue.length !== 0 && (
            <div className="bg-purple-500 opacity-80 text-sm p-2 rounded-lg shadow backdrop-blur-[1rem] text-left text-black">
              {Object.entries(propsValue).map(([key, value], index) => (
                <div key={index}>
                  <p>
                    <span className=" font-bold">
                      {key}: {""}
                    </span>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          )}
          {toggleQuery && (
            <>
              <div className="bg-purple-500 opacity-80 text-sm p-2 rounded-lg shadow backdrop-blur-[1rem] text-left text-black">
                <select
                  className="w-full bg-purple-500 opacity-80 scrollbar-thin scrollbar-thumb-green-100  scrollbar-track-purple-200"
                  onChange={(e) => setSelectedRegion(e.target.value)}>
                  <option value="">---</option>
                  {regionsData.map((region, index) => (
                    <option key={index} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              {selectedRegion && (
                <div className="bg-purple-500 opacity-80 text-sm p-2 rounded-lg shadow backdrop-blur-[1rem] text-left text-black">
                  <select
                    className="w-full bg-purple-500 opacity-80 scrollbar-thin scrollbar-thumb-green-100  scrollbar-track-purple-200"
                    onChange={(e) => setSelectedProvince(e.target.value)}>
                    <option value="">---</option>

                    {provincesData.map((province, index) => (
                      <option key={index} value={province}>
                        {province}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {selectedRegion && selectedProvince && (
                <div className="bg-purple-500 opacity-80 text-sm p-2 rounded-lg shadow backdrop-blur-[1rem] text-left text-black">
                  <select
                    className="w-full bg-purple-500 opacity-80 scrollbar-thin scrollbar-thumb-green-100 scrollbar-track-purple-200"
                    onChange={(e) => setSelectedMunicipality(e.target.value)}>
                    <option value="">---</option>

                    {municipalitiesData.map((municipality, index) => (
                      <option key={index} value={municipality}>
                        {municipality}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {selectedRegion && selectedProvince && selectedMunicipality && (
                <button
                  onClick={async () => {
                    await getMunicipalityCoordinates(map);
                  }}
                  className={`hover:scale-90  transition delay-75 duration-500 ease-in-out text-[18px] w-full text-sm py-2 rounded-full text-black bg-purple-600`}>
                  View
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default MapComponent;
