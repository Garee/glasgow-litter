import { GeoJsonObject } from "geojson";
import React, { FC } from "react";
import { GeoJSON } from "react-leaflet";
import * as dataZones from "../../../../data/geojson/glasgow-data-zones.geojson.json";

export type DataZonesProps = Record<string, never>;

export const DataZones: FC<DataZonesProps> = () => {
  const style = {
    color: "black",
    fillColor: "white",
    weight: 3,
    opacity: 1,
  };

  return <GeoJSON data={dataZones as GeoJsonObject} style={style}></GeoJSON>;
};
