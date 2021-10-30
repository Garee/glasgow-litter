import React, { FC } from "react";
import { Map } from "../map";

type AppProps = Record<string, never>;

export const App: FC<AppProps> = () => {
  return <Map />;
};
