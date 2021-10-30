import { GeoJsonObject } from "geojson";
import { PathOptions } from "leaflet";
import React, { FC } from "react";
import { GeoJSON, Tooltip } from "react-leaflet";

export interface WardProps {
  id: number;
  name: string;
  data: GeoJsonObject;
  style: PathOptions;
}

export const Ward: FC<WardProps> = ({ name, data, style }) => {
  return (
    <GeoJSON data={data} style={style}>
      <Tooltip>{name}</Tooltip>
    </GeoJSON>
  );
};
