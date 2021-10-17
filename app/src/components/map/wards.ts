import { GeoJsonObject } from "geojson";
import * as anderstonCityYorkhill from "../../../../data/geojson/wards/anderston-city-yorkhill.geojson.json";
import * as baillieston from "../../../../data/geojson/wards/baillieston.geojson.json";
import * as calton from "../../../../data/geojson/wards/calton.geojson.json";
import * as canal from "../../../../data/geojson/wards/canal.geojson.json";
import * as cardonald from "../../../../data/geojson/wards/cardonald.geojson.json";
import * as dennistoun from "../../../../data/geojson/wards/dennistoun.geojson.json";
import * as drumchapelAnniesland from "../../../../data/geojson/wards/drumchapel-anniesland.geojson.json";
import * as eastCentre from "../../../../data/geojson/wards/east-centre.json";
import * as garscaddenScotstounhill from "../../../../data/geojson/wards/garscadden-scotstounhill.geojson.json";
import * as govan from "../../../../data/geojson/wards/govan.geojson.json";
import * as greaterPollock from "../../../../data/geojson/wards/greater-pollock.geojson.json";
import * as hillhead from "../../../../data/geojson/wards/hillhead.geojson.json";
import * as langside from "../../../../data/geojson/wards/langside.geojson.json";
import * as linn from "../../../../data/geojson/wards/linn.geojson.json";
import * as maryhill from "../../../../data/geojson/wards/maryhill.geojson.json";
import * as newlandsAuldburn from "../../../../data/geojson/wards/newlands-auldburn.geojson.json";
import * as northEast from "../../../../data/geojson/wards/north-east.geojson.json";
import * as partickEastKelvindale from "../../../../data/geojson/wards/partick-east-kelvindale.geojson.json";
import * as pollockshields from "../../../../data/geojson/wards/pollokshields.geojson.json";
import * as shettleston from "../../../../data/geojson/wards/shettleston.geojson.json";
import * as southsideCentral from "../../../../data/geojson/wards/southside-central.geojson.json";
import * as springburnRobroyston from "../../../../data/geojson/wards/springburn-robroyston.geojson.json";
import * as victoriaPark from "../../../../data/geojson/wards/victoria-park.geojson.json";

interface Ward {
  id: number;
  name: string;
  data: GeoJsonObject;
  style?: {
    color?: string;
  };
}

export const wards: Ward[] = [
  {
    id: 10,
    name: "Anderston/City/Yorkhill",
    data: anderstonCityYorkhill as GeoJsonObject,
    style: {
      color: "red",
    },
  },
  {
    id: 20,
    name: "Baillieston",
    data: baillieston as GeoJsonObject,
    style: {
      color: "orange",
    },
  },
  {
    id: 9,
    name: "Calton",
    data: calton as GeoJsonObject,
    style: {
      color: "purple",
    },
  },
  {
    id: 16,
    name: "Canal",
    data: canal as GeoJsonObject,
    style: {
      color: "yellow",
    },
  },
  {
    id: 4,
    name: "Cardonald",
    data: cardonald as GeoJsonObject,
    style: {
      color: "deeppink",
    },
  },
  {
    id: 22,
    name: "Denniestoun",
    data: dennistoun as GeoJsonObject,
    style: {
      color: "deepskyblue",
    },
  },
  {
    id: 14,
    name: "Drumchapel/Anniesland",
    data: drumchapelAnniesland as GeoJsonObject,
    style: {
      color: "blue",
    },
  },
  {
    id: 18,
    name: "East Centre",
    data: eastCentre as GeoJsonObject,
    style: {
      color: "brown",
    },
  },
  {
    id: 13,
    name: "Garscadden/Scotstounhill",
    data: garscaddenScotstounhill as GeoJsonObject,
    style: {
      color: "cyan",
    },
  },
  {
    id: 5,
    name: "Govan",
    data: govan as GeoJsonObject,
    style: {
      color: "sandybrown",
    },
  },
  {
    id: 3,
    name: "Greater Pollock",
    data: greaterPollock as GeoJsonObject,
    style: {
      color: "darkgreen",
    },
  },
  {
    id: 11,
    name: "Hillhead",
    data: hillhead as GeoJsonObject,
    style: {
      color: "lightsalmon",
    },
  },
  {
    id: 7,
    name: "Langside",
    data: langside as GeoJsonObject,
    style: {
      color: "mediumslateblue",
    },
  },
  {
    id: 1,
    name: "Linn",
    data: linn as GeoJsonObject,
    style: {
      color: "olive",
    },
  },
  {
    id: 15,
    name: "Maryhill",
    data: maryhill as GeoJsonObject,
    style: {
      color: "yellowgreen",
    },
  },
  {
    id: 2,
    name: "Newlands/Auldburn",
    data: newlandsAuldburn as GeoJsonObject,
    style: {
      color: "slategray",
    },
  },
  {
    id: 21,
    name: "North East",
    data: northEast as GeoJsonObject,
    style: {
      color: "aquamarine",
    },
  },
  {
    id: 23,
    name: "Partick East/Kelvindale",
    data: partickEastKelvindale as GeoJsonObject,
    style: {
      color: "tomato",
    },
  },
  {
    id: 6,
    name: "Pollockshields",
    data: pollockshields as GeoJsonObject,
    style: {
      color: "indigo",
    },
  },
  {
    id: 19,
    name: "Shettleston",
    data: shettleston as GeoJsonObject,
    style: {
      color: "navy",
    },
  },
  {
    id: 8,
    name: "Southside Central",
    data: southsideCentral as GeoJsonObject,
    style: {
      color: "darkslategray",
    },
  },
  {
    id: 17,
    name: "Springburn/Robroyston",
    data: springburnRobroyston as GeoJsonObject,
    style: {
      color: "chocolate",
    },
  },
  {
    id: 12,
    name: "Victoria Park",
    data: victoriaPark as GeoJsonObject,
    style: {
      color: "darkcyan",
    },
  },
];
