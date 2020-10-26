import React, { useState, useEffect } from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import './styles/Map.css';
import { showDataOnMap } from './util';

function Map({ countries, casesType, center, zoom}) {

  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&cppy; <a hrref="http://osm/org/copyright">
          OpenStreettMap</a> contributors'
        />
        {/* Loop through countries and draw circles on the screen */}
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </div>

  );
}

export default Map;