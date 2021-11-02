import { IncomingMessage } from "http";
import { Icon, LatLngExpression } from "leaflet";
import React, { FC } from "react";
import { Marker, Popup } from "react-leaflet";
import "./image-marker.css";

export interface ImageMarkerProps {
  id: string;
  lat: number;
  lon: number;
  width: number;
  height: number;
  path: string;
  dataZone: string;
}

export const ImageMarker: FC<ImageMarkerProps> = ({
  dataZone,
  lat,
  lon,
  width,
  height,
  path,
}) => {
  const icon = new Icon({
    iconUrl: "image.png",
    iconSize: [32, 32],
    className: "image-marker-icon",
  });
  const position: LatLngExpression = [lat, lon];
  const maxPopupWidth = undefined; // 100%
  return (
    <Marker position={position} icon={icon}>
      <Popup maxWidth={maxPopupWidth}>
        <strong>Data Zone {dataZone}</strong>
        <br />
        <br />
        <span>Latitude: {lat}</span>
        <br />
        <span>Longitude: {lon}</span>
        <br />
        <br />
        <img src={path} width={width} height={height} />
      </Popup>
    </Marker>
  );
};
