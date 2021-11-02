import { Icon, LatLngExpression } from "leaflet";
import React, { FC } from "react";
import { Marker, Popup } from "react-leaflet";
import "./public-recycling-marker.css";
export interface PublicRecyclingMarkerProps {
  id: string;
  lat: number;
  lon: number;
  name: string;
  materials: string;
  link: string;
}

export const PublicRecyclingMarker: FC<PublicRecyclingMarkerProps> = ({
  lat,
  lon,
  name,
  materials,
}) => {
  const icon = new Icon({
    iconUrl: "recycling.png",
    iconSize: [32, 32],
    className: "public-recycling-marker-icon",
  });
  const position: LatLngExpression = [lat, lon];
  return (
    <Marker position={position} icon={icon}>
      <Popup>
        <strong>{name}</strong>
        <br />
        <br />
        <span>Latitude: {lat}</span>
        <br />
        <span>Longitude: {lon}</span>
        <br />
        <br />
        <span>{materials}</span>
      </Popup>
    </Marker>
  );
};
