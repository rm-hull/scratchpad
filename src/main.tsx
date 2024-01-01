import { ChakraProvider, ColorModeScript, createLocalStorageManager, extendTheme } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import ErrorFallback from "./components/ErrorFallback";
import "./main.css";
import reportWebVitals from "./reportWebVitals";

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
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_API_CLIENT_ID as string}>
        <Router basename="/scratchpad">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <App />
          </ErrorBoundary>
        </Router>
      </GoogleOAuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
