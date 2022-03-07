import React, { FC, useState } from "react";
import { useMapEvents } from "react-leaflet";

export interface ZoomRenderLayerProps {
  initialZoom: number;
  threshold: number;
}

export const ZoomRenderLayer: FC<ZoomRenderLayerProps> = ({
  initialZoom,
  threshold,
  children,
}) => {
  const [zoom, setZoom] = useState(initialZoom);

  const map = useMapEvents({
    zoomend: () => {
      setZoom(map.getZoom());
    },
  });

  return <>{zoom >= threshold && children}</>;
};
