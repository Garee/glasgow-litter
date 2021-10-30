import { Icon, LatLngExpression } from "leaflet";
import React, { FC } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Tooltip,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import { wards } from "./wards";
import "./leaflet";
import "./map.css";
import * as dataZones from "../../../../data/geojson/glasgow-data-zones.geojson.json";
import * as streetViewImages from "../../../../data/street-view/images.json";
import * as publicRecyclingPoints from "../../../../data/publicRecyclingPoints.json";
import { GeoJsonObject } from "geojson";
import { ImageMarker, ImageMarkerProps } from "../image-marker";
import { PublicRecyclingMarker } from "../public-recycling-marker";

export const Map: FC = () => {
  const center: LatLngExpression = [55.865, -4.257];
  const zoom = 12;
  const scrollWheelZoom = true;

  const tileLayers = [
    {
      name: "OpenStreetMap Standard",
      attribution: `&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    },
    {
      name: "OpenStreetMap Black & White",
      attribution: `&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors`,
      url: "https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png",
    },
    {
      name: "Stamen Watercolor",
      attribution: `Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.`,
      url: "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
    },
  ];

  const imageMarkers = getImageMarkers();
  const publicRecyclingMarkers = getPublicRecyclingMarkers();

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      className="map"
    >
      <LayersControl position="topright">
        {tileLayers.map((tileLayer, i) => (
          <LayersControl.BaseLayer
            name={tileLayer.name}
            key={tileLayer.name}
            checked={i == 0}
          >
            <TileLayer
              attribution={tileLayer.attribution}
              url={tileLayer.url}
            />
          </LayersControl.BaseLayer>
        ))}
        <LayersControl.Overlay name="Wards" checked>
          <LayerGroup>
            {wards.map((ward) => (
              <GeoJSON data={ward.data} style={ward.style} key={ward.id}>
                <Tooltip>{ward.name}</Tooltip>
              </GeoJSON>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Data Zones" checked>
          <GeoJSON
            data={dataZones as GeoJsonObject}
            style={{
              color: "black",
              fillColor: "blue",
              weight: 3,
              opacity: 0.5,
            }}
          ></GeoJSON>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Image Markers" checked>
          <LayerGroup>{imageMarkers}</LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Public Recycling Facilities" checked>
          <LayerGroup>{publicRecyclingMarkers}</LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};

function getImageMarkers(): JSX.Element[] {
  const imageMarkerData = Object.entries(streetViewImages).reduce(
    (acc: ImageMarkerProps[], val) => {
      const [dataZone, data] = val;
      if (!dataZone || !data?.points) {
        return acc;
      }
      return acc.concat(
        data.points.map(({ lat, lon }: { lat: number; lon: number }) => {
          return {
            id: `${lat}_${lon}`,
            position: [lat, lon],
            popupText: `${dataZone}: ${lat},${lon}`,
          };
        })
      );
    },
    []
  );

  return imageMarkerData.map((props) => (
    <ImageMarker {...props} key={props.id} />
  ));
}

function getPublicRecyclingMarkers(): JSX.Element[] {
  const publicRecyclingMarkerData = publicRecyclingPoints.features.map(
    (feature) => {
      const lat = feature.geometry.y;
      const lon = feature.geometry.x;
      const position: LatLngExpression = [lat, lon];
      return {
        id: `${lat}_${lon}`,
        position,
        popupText: JSON.stringify(feature.attributes),
        icon: new Icon({ iconUrl: "recycle-bin.png", iconSize: [30, 30] }),
      };
    }
  );

  return publicRecyclingMarkerData.map((props) => (
    <PublicRecyclingMarker {...props} key={props.id} />
  ));
}
