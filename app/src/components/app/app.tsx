import React, { FC } from "react";
import { InfoButton } from "../info-button";
import { UploadButton } from "../upload-button";
import { Map } from "../map";

type AppProps = Record<string, never>;

export const App: FC<AppProps> = () => {
  return (
    <>
      <InfoButton />
      <UploadButton />
      <Map />
    </>
  );
};
