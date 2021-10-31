import { Icon, LatLngExpression } from "leaflet";
import React, { FC } from "react";
import { Marker, Popup } from "react-leaflet";

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
  const icon = new Icon({ iconUrl: "image.png", iconSize: [32, 32] });
  const position: LatLngExpression = [lat, lon];
  const maxPopupWidth = undefined; // 100%
  return (
    <Marker position={position} icon={icon}>
      <Popup maxWidth={maxPopupWidth}>
        <strong>Data Zone {dataZone}</strong>
        <br />
        <span>Latitude: {lat}</span>
        <br />
        <span>Longitude: {lon}</span>
        <br />
        <img src={path} width={width} height={height} />
      </Popup>
    </Marker>
  );
};
