import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RainbowAppWrapper from "./RainbowAppWrapper";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
//import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ColorSchemeProvider>
      <MantineProvider
        withGlobalStyles
        theme={{ colorScheme: "dark" }}
        withNormalizeCSS
      >
        <RainbowAppWrapper />
      </MantineProvider>
    </ColorSchemeProvider>
  </React.StrictMode>
);
