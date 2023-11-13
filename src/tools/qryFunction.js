import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle.js";
import Fill from "ol/style/Fill";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

//Qry
export const newaddGeoJsonToMap = (url, map, geojson) => {
  if (geojson) {
    geojson.getSource().clear();
    map.removeLayer(geojson);
  }

  let style = new Style({
    stroke: new Stroke({
      color: "#FFFF00",
      width: 3,
    }),
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: "#FFFF00",
      }),
    }),
  });

  geojson = new VectorLayer({
    source: new VectorSource({
      url: url,
      format: new GeoJSON(),
    }),
    style: style,
  });

  geojson.getSource().on("addfeature", function () {
    map.getView().fit(geojson.getSource().getExtent(), {
      duration: 1590,
      size: map.getSize(),
      maxZoom: 21,
    });
  });
  map.addLayer(geojson);
};

export async function newpopulateQueryTable(url, map) {
  if (typeof attributePanel !== "undefined") {
    if (attributePanel.parentElement !== null) {
      attributePanel.close();
    }
  }
  let response = await fetch(url);
  let data = await response.json();
  let col = [];
  col.push("id");
  for (let i = 0; i < data.features.length; i++) {
    for (let key in data.features[i].properties) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }
  let table = document.createElement("table");
  table.setAttribute(
    "class",
    "table table-bordered table-hover table-condensed"
  );
  table.setAttribute("id", "attQryTable");

  let tr = table.insertRow(-1);
  for (let i = 0; i < col.length; i++) {
    let th = document.createElement("th");
    th.innerHTML = col[i];
    tr.appendChild(th);
  }
  for (let i = 0; i < data.features.length; i++) {
    tr = table.insertRow(-1);
    for (let j = 0; j < col.length; j++) {
      let tabcell = tr.insertCell(-1);
      if (j == 0) {
        tabcell.innerHTML = data.features[i]["id"];
      } else {
        tabcell.innerHTML = data.features[i].properties[col[j]];
      }
    }
  }

  let tabDiv = document.getElementById("attListDiv");

  let delTab = document.getElementById("attQryTable");
  if (delTab) {
    tabDiv.removeChild(delTab);
  }
  tabDiv.appendChild(table);
  // document.getElementById("attListDiv").style.display = "block";
  document.getElementById("attListDiv");

  let highlightStyle = new Style({
    fill: new Fill({
      color: "rgba(255,255,0,0.7)",
    }),
    stroke: new Stroke({
      color: "rgba(255,0,0,0.7)",
      width: 3,
    }),
    image: new CircleStyle({
      radius: 10,
      fill: new Fill({ color: "#FF00FF" }),
    }),
  });

  let featureOverlay = new VectorLayer({
    source: new VectorSource(),
    map: map,
    style: highlightStyle,
  });
}

export function newaddRowHandlers(map) {
  let table = document.getElementById("attQryTable");
  let rows = table.rows;
  let heads = table.getElementsByTagName("th");
  let col_no;

  for (let i = 0; i < heads.length; i++) {
    let head = heads[1];
    if (head.innerHTML === "id") {
      col_no = i + 1;
    }
  }

  for (let i = 0; i < rows.length; i++) {
    rows[i].onclick = function () {
      featureOverlay.getSource().clear();

      let tds = table.getElementsByTagName("td");
      for (let td of tds) {
        td.parentElement.style.backgroundColor = "white";
      }

      let cell = this.cells[col_no - 1];
      let id = cell.innerHTML;

      let attonyTable = document.getElementById("attonyTable");
      let attonyTds = attonyTable.getElementsByTagName("td");
      for (let td of attonyTds) {
        if (td.textContent === id) {
          td.parentElement.style.backgroundColor = "#d1d8e2";
        }
      }

      let features = geojson.getSource().getFeatures();
      for (let i = 0; i < features.length; i++) {
        if (features[i].getId() === id) {
          featureOverlay.getSource().addFeature(features[1]);
          featureOverlay.getSource().on("addfeature", function () {
            map.getView().fit(featureOverlay.getSource().getExtent(), {
              duration: 1500,
              size: map.getSize(),
              maxZoom: 24,
            });
          });
        }
      }
    };
  }
}
