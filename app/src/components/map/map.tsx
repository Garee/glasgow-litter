import { Icon, LatLngExpression } from "leaflet";
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
  MarkerProps,
} from "react-leaflet";
import { wards } from "./wards";
import "./leaflet";
import "./map.css";
import * as dataZones from "../../../../data/geojson/glasgow-data-zones.geojson.json";
import * as streetViewImages from "../../../../data/street-view/images.json";
import * as publicRecyclingPoints from "../../../../data/publicRecyclingPoints.json";

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

  const markers: any[] = Object.entries(streetViewImages).reduce(
    (acc: any[], val: any[]) => {
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

  const publicRecyclingMarkers: any[] = publicRecyclingPoints.features.map(
    (feature: any) => {
      const lat = feature.geometry.y;
      const lon = feature.geometry.x;
      return {
        id: `${lat}_${lon}`,
        position: [lat, lon],
        popupText: JSON.stringify(feature.attributes),
        icon: new Icon({ iconUrl: "recycle-bin.png", iconSize: [30, 30] }),
      };
    }
  );

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
            data={dataZones as any}
            style={{
              color: "black",
              fillColor: "blue",
              weight: 3,
              opacity: 0.5,
            }}
          ></GeoJSON>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Image Markers" checked>
          <LayerGroup>
            {markers.map((marker) => (
              <Marker position={marker.position} key={marker.id}>
                <Popup>{marker.popupText}</Popup>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Public Recycling Facilities" checked>
          <LayerGroup>
            {publicRecyclingMarkers.map((marker) => (
              <Marker
                position={marker.position}
                key={marker.id}
                icon={marker.icon}
              >
                <Popup>{marker.popupText}</Popup>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
};
