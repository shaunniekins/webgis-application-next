import { getLength, getArea } from "ol/sphere";

//Length and Area
export const formatLength = (line) => {
  let length = getLength(line);
  let output;
  if (length > 100) {
    output = Math.round((length / 1000) * 100) / 100 + "" + "km";
  } else {
    output = Math.round(length * 100) / 100 + "" + "m";
  }
  return output;
};

export const formatArea = (polygon) => {
  let area = getArea(polygon);
  let output;
  if (area > 10000) {
    output = Math.round((area / 1000000) * 100) / 100 + "" + "km<sup>2</sup>";
  } else {
    output = Math.round(area * 100) / 100 + "" + "m<sup>2</sup>";
  }
  return output;
};
