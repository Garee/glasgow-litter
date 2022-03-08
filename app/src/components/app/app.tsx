import React, { FC } from "react";
import { InfoButton } from "../info-button";
import { Map } from "../map";

type AppProps = Record<string, never>;

export const App: FC<AppProps> = () => {
  return (
    <>
      <InfoButton />
      <Map />
    </>
  );
};
