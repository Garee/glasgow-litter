import { LatLngExpression } from "leaflet";
import React, { FC } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  GeoJSON,
  Tooltip,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import { wards } from "./wards";
import "./leaflet";
import "./map.css";
import * as dataZones from "../../../../data/geojson/glasgow-data-zones.geojson.json";

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

  (window as any).dataZones = dataZones;

  const markers = [
    {
      id: 1,
      position: center,
      popupText: "Glasgow City",
    },
  ];

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
        <LayersControl.Overlay name="Glasgow's Wards" checked>
          <LayerGroup>
            {wards.map((ward) => (
              <GeoJSON data={ward.data} style={ward.style} key={ward.id}>
                <Tooltip>{ward.name}</Tooltip>
              </GeoJSON>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Glasgow's Data Zones" checked>
          <GeoJSON
            data={dataZones as any}
            style={{
              color: "blue",
              weight: 1,
              opacity: 0.2,
            }}
          ></GeoJSON>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Images" checked>
          {markers.map((marker) => (
            <Marker position={marker.position} key={marker.id}>
              <Popup>{marker.popupText}</Popup>
            </Marker>
          ))}
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};
