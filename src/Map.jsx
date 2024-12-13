import { useEffect, useContext, useCallback } from "react";
import { LocationContext } from "./context/LocationContext";
import { GoogleMap, Marker } from "@react-google-maps/api";
import "./index.css";
import SelectedStation from "./components/SelectedStation";

const Map = () => {
  const {
    coordsResult,
    setCoordsResult,
    center,
    map,
    setMap,
    selectedPlace,
    setSelectedPlace,
    reloadMap,
  } = useContext(LocationContext);

  const onMapLoad = useCallback(
    (map) => {
      setMap(map);
      let request = {
        location: new window.google.maps.LatLng(center.lat, center.lng),
        radius: "5000",
        types: ["gas_station", "charging_station", "car_charging"],
      };

      let service = new window.google.maps.places.PlacesService(map);
      service.nearbySearch(request, (results, status, pagination) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setCoordsResult(results);
          if (pagination.hasNextPage) {
            pagination.nextPage();
          }
        }
      });
    },
    [setCoordsResult, center, setMap]
  );

  useEffect(() => {
    if (map) {
      onMapLoad(map);
    }
  }, [reloadMap, map, onMapLoad, center]);

  // Mimic componentDidUpdate for center
  useEffect(() => {
    console.log("Center updated:", center);
    if (map) {
      map.setCenter(new window.google.maps.LatLng(center.lat, center.lng));
    }
  }, [center, map]);
  const fetchPlaceDetails = (placeId) => {
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    const request = {
      placeId: placeId,
      fields: [
        "name",
        "rating",
        "formatted_phone_number",
        "photos",
        "geometry",
      ],
    };

    service.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        setSelectedPlace(place);
      }
    });
  };

  return (
    <div>
      <GoogleMap
        center={center}
        panTo={center}
        zoom={16}
        onLoad={onMapLoad}
        mapContainerStyle={{ height: "100vh", width: "100vw" }}
      >
        <Marker position={center} />
        {coordsResult.length > 0 &&
          coordsResult.map((result, i) => {
            return (
              <div key={i}>
                <Marker
                  position={result.geometry.location}
                  onClick={() => fetchPlaceDetails(result.place_id)}
                >
                  {selectedPlace &&
                    selectedPlace.geometry.location.lat() ===
                      result.geometry.location.lat() &&
                    selectedPlace.geometry.location.lng() ===
                      result.geometry.location.lng() && (
                      <SelectedStation
                        selectedPlace={selectedPlace}
                        result={result}
                      />
                    )}
                </Marker>
              </div>
            );
          })}
      </GoogleMap>
    </div>
  );
};

export default Map;
