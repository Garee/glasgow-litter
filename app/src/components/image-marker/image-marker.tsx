import { Icon, LatLngExpression } from "leaflet";
import React, { FC } from "react";
import { Marker, Popup } from "react-leaflet";
import "./image-marker.css";
import * as detectionMetadata from "../../../../models/yolov5/yolov5/runs/detect/exp/metadata.json";

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
  let iconUrl = "image.png";
  let className = "image-marker-icon";

  const tokens = path.split("/");
  const fname = tokens[tokens.length - 1];
  const images: any = (detectionMetadata as any).images;
  if (fname in images) {
    iconUrl = "litter.png";
    className = "image-marker-icon litter-marker-icon";
    path = images[fname].path;
  }

  const icon = new Icon({
    iconUrl,
    iconSize: [32, 32],
    className,
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
