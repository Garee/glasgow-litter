import { Icon, LatLngExpression } from "leaflet";
import React, { FC } from "react";
import { Marker, Popup } from "react-leaflet";

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
  link,
}) => {
  const icon = new Icon({ iconUrl: "recycling.png", iconSize: [32, 32] });
  const position: LatLngExpression = [lat, lon];
  return (
    <Marker position={position} icon={icon}>
      <Popup>
        <strong>{name}</strong>
        <br />
        <span>{materials}</span>
        <br />
        <span>Latitude: {lat}</span>
        <br />
        <span>Longitude: {lon}</span>
        <br />
        <span>
          <a href={link}>Link</a>
        </span>
      </Popup>
    </Marker>
  );
};
