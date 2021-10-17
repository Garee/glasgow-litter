import { LatLngExpression } from "leaflet";
import React, { FC } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  Tooltip,
} from "react-leaflet";
import { wards } from "./wards";
import "./leaflet";
import "./map.css";

export const Map: FC = () => {
  const center: LatLngExpression = [55.865, -4.257];
  const zoom = 12;
  const scrollWheelZoom = true;

  const tileLayer = {
    attribution: `&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  };

  const markers = [
    {
      id: 1,
      position: center,
      popupText: "Glasgow City",
    },
  ];

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      className="map"
    >
      <TileLayer attribution={tileLayer.attribution} url={tileLayer.url} />
      {wards.map((ward) => (
        <GeoJSON data={ward.data} style={ward.style} key="id">
          <Tooltip>{ward.name}</Tooltip>
        </GeoJSON>
      ))}
      {markers.map((marker) => (
        <Marker position={marker.position} key="id">
          <Popup>{marker.popupText}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};
