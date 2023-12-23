import { ChakraProvider, ColorModeScript, createLocalStorageManager, theme } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import ErrorFallback from "./components/ErrorFallback";
import "./main.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root")!);
const manager = createLocalStorageManager("scratchpad.color-mode");
// const theme = extendTheme(withDefaultColorScheme({ colorScheme: "red" }));

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
