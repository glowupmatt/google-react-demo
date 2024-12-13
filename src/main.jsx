import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { LocationProvider } from "./context/LocationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocationProvider>
      <App />
    </LocationProvider>
  </StrictMode>
);
