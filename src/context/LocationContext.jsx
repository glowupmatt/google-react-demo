import { createContext, useState } from "react";
import PropTypes from "prop-types";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [center, setCenter] = useState({ lat: 48.8606, lng: 2.3376 });
  const [coordsResult, setCoordsResult] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [map, setMap] = useState(null);
  const [reloadMap, setReloadMap] = useState(false);
  return (
    <LocationContext.Provider
      value={{
        center,
        setCenter,
        coordsResult,
        setCoordsResult,
        selectedPlace,
        setSelectedPlace,
        map,
        setMap,
        reloadMap,
        setReloadMap,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

LocationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LocationContext };
