import {
  Icon,
  latLng,
  LatLngExpression,
  LeafletMouseEventHandlerFn,
} from "leaflet";
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
  const position: LatLngExpression = [lat, lon];

  const iconUrl = "litter.png";
  const className = "image-marker-icon litter-marker-icon";

  const icon = new Icon({
    iconUrl,
    iconSize: [32, 32],
    className,
  });

  const onMarkerClick: LeafletMouseEventHandlerFn = (e) => {
    const map = e.target._map;
    const { lat, lng } = e.latlng;
    map.flyTo(latLng(lat, lng));
  };

  const maxPopupWidth = undefined; // 100%
  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{ click: onMarkerClick }}
    >
      <Popup maxWidth={maxPopupWidth}>
        <strong>Litter</strong>
        <hr />
        <br />
        <strong>Data Zone: {dataZone}</strong>
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
