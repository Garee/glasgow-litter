import React from "react";
import { render } from "react-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { App } from "./components/app";
import "./index.css";

render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById("app")
);
