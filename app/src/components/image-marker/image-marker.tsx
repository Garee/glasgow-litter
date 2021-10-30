import { Icon, LatLngExpression } from "leaflet";
import React, { FC } from "react";
import { Marker, Popup } from "react-leaflet";

export interface ImageMarkerProps {
  id: string;
  lat: number;
  lon: number;
  dataZone: string;
}

export const ImageMarker: FC<ImageMarkerProps> = ({ dataZone, lat, lon }) => {
  const icon = new Icon({ iconUrl: "image.png", iconSize: [32, 32] });
  const position: LatLngExpression = [lat, lon];
  return (
    <Marker position={position} icon={icon}>
      <Popup>
        <strong>Data Zone {dataZone}</strong>
        <br />
        <span>Latitude: {lat}</span>
        <br />
        <span>Longitude: {lon}</span>
      </Popup>
    </Marker>
  );
};
