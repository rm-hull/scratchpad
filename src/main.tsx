import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import ReactGA from "react-ga4";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import { ErrorFallback } from "./components/ErrorFallback";
import "./main.css";
import { reportWebVitals } from "./reportWebVitals";
// import { ColorModeProvider } from "./components/ui/color-mode";
import { Toaster } from "./components/ui/toaster";
import { Provider } from "./components/ui/provider";

if (import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID !== undefined) {
  ReactGA.initialize(import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID as string);
}

const element = document.getElementById("root");
if (element === null) {
  throw Error("root element not found");
}
const root = ReactDOM.createRoot(element);
// const manager = createLocalStorageManager("scratchpad.color-mode");

root.render(
  <React.StrictMode>
    {/* <ColorModeScript initialColorMode="dark" storageKey="scratchpad.color-mode" /> */}
    <Provider /* value={createSystem(defaultConfig)}*/>

      <Router basename="/scratchpad">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Toaster />
          <App />
        </ErrorBoundary>
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
