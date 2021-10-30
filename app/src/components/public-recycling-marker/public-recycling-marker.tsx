import { Icon, LatLngExpression } from "leaflet";
import React, { FC } from "react";
import { Marker, Popup } from "react-leaflet";

interface PublicRecyclingMarkerProps {
  position: LatLngExpression;
  popupText: string;
  icon: Icon;
}

export const PublicRecyclingMarker: FC<PublicRecyclingMarkerProps> = ({
  position,
  popupText,
  icon,
}) => {
  return (
    <Marker position={position} icon={icon}>
      <Popup>{popupText}</Popup>
    </Marker>
  );
};
