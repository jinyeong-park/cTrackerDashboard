import React, { useState, useEffect } from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import './styles/Map.css';

function Map({center, zoom}) {

  return (
    <div className="map">
      <h1>Map component</h1>
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&cppy; <a hrref="http://osm/org/copyright">
          OpenStreettMap</a> contributors'
        />
      </LeafletMap>
    </div>

  );
}

export default Map;