import { ChakraProvider, ColorModeScript, createLocalStorageManager, extendTheme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import ReactGA from "react-ga4";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import ErrorFallback from "./components/ErrorFallback";
import "./main.css";
import reportWebVitals from "./reportWebVitals";

ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID as string);

const element = document.getElementById("root");
if (element === null) {
  throw Error("root element not found");
}
const root = ReactDOM.createRoot(element);
const manager = createLocalStorageManager("scratchpad.color-mode");

const theme = extendTheme({
  fonts: {
    mono: `JetBrainsMono,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
  },
});

root.render(
  <React.StrictMode>
    <ColorModeScript initialColorMode="dark" storageKey="scratchpad.color-mode" />
    <ChakraProvider theme={theme} colorModeManager={manager}>
      <Router basename="/scratchpad">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <App />
        </ErrorBoundary>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
