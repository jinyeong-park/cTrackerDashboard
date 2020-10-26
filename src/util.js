import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";


export const sortData = (data) => {
  let sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sortedData;
};

 // one line
  // return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));

