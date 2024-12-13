import { LoadScript } from "@react-google-maps/api";
import { useState } from "react";
import Map from "./Map";
import ListOfStations from "./components/ListOfStations";

const lib = ["places"];
const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // PUT GMAP API KEY HERE

const App = () => {
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <LoadScript googleMapsApiKey={key} libraries={lib}>
      <button onClick={() => setSideOpen(!sideOpen)} className="side-button">
        {sideOpen ? "Close" : "Open"} List of Stations
      </button>
      {sideOpen && (
        <div className="side-bar">
          <ListOfStations />
        </div>
      )}
      <div className="map-container">
        <Map />
      </div>
    </LoadScript>
  );
};

export default App;
