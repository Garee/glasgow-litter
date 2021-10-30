import { LatLngExpression } from "leaflet";
import React, { FC } from "react";
import { Marker, Popup } from "react-leaflet";

export interface ImageMarkerProps {
  id: string;
  position: LatLngExpression;
  popupText: string;
}

export const ImageMarker: FC<ImageMarkerProps> = ({ position, popupText }) => {
  return (
    <Marker position={position}>
      <Popup>{popupText}</Popup>
    </Marker>
  );
};
