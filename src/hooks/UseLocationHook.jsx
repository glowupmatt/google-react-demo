import { useRef, useContext } from "react";
import { LocationContext } from "../context/LocationContext";

const useLocationHook = () => {
  const { setCenter } = useContext(LocationContext);
  const mapRef = useRef(null);

  const panToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(pos);
          console.log(pos, "RANNNN");
        },
        () => {
          handleLocationError(true, mapRef.current.getCenter());
        }
      );
    } else {
      handleLocationError(false, mapRef.current.getCenter());
    }
  };

  const handleLocationError = (browserHasGeolocation, pos) => {
    const infoWindow = new window.google.maps.InfoWindow();
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(mapRef.current);
  };

  return { mapRef, panToCurrentLocation };
};

export default useLocationHook;
