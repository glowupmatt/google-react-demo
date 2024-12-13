import { createContext, useState } from "react";
import PropTypes from "prop-types";

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [center, setCenter] = useState({ lat: 47.583471, lng: -122.035027 });
  const [coordsResult, setCoordsResult] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  return (
    <LocationContext.Provider
      value={{
        center,
        setCenter,
        coordsResult,
        setCoordsResult,
        selectedPlace,
        setSelectedPlace,
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
