import { LatLngExpression } from "leaflet";
import React, { FC, useState } from "react";
import {
  MapContainer,
  TileLayer,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "./leaflet";
import "./map.css";
import * as streetViewImages from "../../../../data/detected/images.json";
import * as publicRecyclingPoints from "../../../../data/publicRecyclingPoints.json";
import { ImageMarker, ImageMarkerProps } from "../image-marker";
import { PublicRecyclingMarker } from "../public-recycling-marker";
import { DataZones } from "../data-zones";
import { Wards } from "../wards";

export interface MapProps {
  center?: LatLngExpression;
  zoom?: number;
  maxZoom?: number;
  scrollWheelZoom?: boolean;
  tileLayers?: TileLayer[];
}

export interface TileLayer {
  name: string;
  attribution: string;
  url: string;
  isDefault?: boolean;
}

export const Map: FC<MapProps> = ({
  center = [55.865, -4.257], // Glasgow City
  zoom = 12,
  maxZoom = 20,
  scrollWheelZoom = true,
  tileLayers = [
    {
      name: "OpenStreetMap Standard",
      attribution: `&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      isDefault: true,
    },
    {
      name: "Stamen Watercolor",
      attribution: `Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.`,
      url: "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
    },
  ],
} = {}) => {
  const [tileLayerControls] = useState(getTileLayerControls(tileLayers));
  const [imageMarkers] = useState(getImageMarkersGroup());
  const [publicRecyclingMarkers] = useState(getPublicRecyclingMarkersGroup());

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      maxZoom={maxZoom}
      scrollWheelZoom={scrollWheelZoom}
      className="map"
    >
      <LayersControl position="topright">
        {tileLayerControls}
        <LayersControl.Overlay name="Data Zones" checked>
          <LayerGroup>
            <DataZones />
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Wards" checked>
          <LayerGroup>
            <Wards />
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Litter" checked>
          <LayerGroup>{imageMarkers}</LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Public Recycling Facilities" checked>
          <LayerGroup>{publicRecyclingMarkers}</LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

function getTileLayerControls(tileLayers: TileLayer[] = []): JSX.Element[] {
  return tileLayers.map(({ name, attribution, url, isDefault }) => (
    <LayersControl.BaseLayer name={name} key={name} checked={isDefault}>
      <TileLayer attribution={attribution} url={url} />
    </LayersControl.BaseLayer>
  ));
}

function getImageMarkersGroup(): JSX.Element {
  const imageMarkerData = Object.entries(streetViewImages.dataZones).reduce(
    (acc: ImageMarkerProps[], val) => {
      const [dataZone, data] = val;
      if (!dataZone || !data?.images) {
        return acc;
      }
      return acc.concat(
        data.images.map(({ lat, lon, width, height, path }) => {
          return {
            id: `${lat}_${lon}`,
            dataZone,
            lat,
            lon,
            width,
            height,
            path,
          };
        })
      );
    },
    []
  );

  const markers = imageMarkerData.map((props) => (
    <ImageMarker {...props} key={props.id} />
  ));

  return <MarkerClusterGroup>{markers}</MarkerClusterGroup>;
}

function getPublicRecyclingMarkersGroup(): JSX.Element {
  const publicRecyclingMarkerData = publicRecyclingPoints.features.map(
    (feature) => {
      const lat = feature.geometry.y;
      const lon = feature.geometry.x;
      const { LINKTEXT, MATERIALS, HYPERLINK } = feature.attributes;
      return {
        id: `${lat}_${lon}`,
        lat,
        lon,
        name: LINKTEXT,
        materials: MATERIALS,
        link: HYPERLINK,
      };
    }
  );

  const markers = publicRecyclingMarkerData.map((props) => (
    <PublicRecyclingMarker {...props} key={props.id} />
  ));

  return <MarkerClusterGroup>{markers}</MarkerClusterGroup>;
}
