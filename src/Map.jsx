// import { useCallback, useContext } from "react";
// import { LocationContext } from "./context/LocationContext";
// import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

// const Map = () => {
//   const {
//     coordsResult,
//     setCoordsResult,
//     center,
//     selectedPlace,
//     setSelectedPlace,
//   } = useContext(LocationContext);

//   const onMapLoad = useCallback(
//     (map) => {
//       let request = {
//         location: new window.google.maps.LatLng(47.583471, -122.035027),
//         radius: "5000",
//         types: ["gas_station"],
//       };

//           let service = new window.google.maps.places.PlacesService(map);

//       service.nearbySearch(request, (results, status, pagination) => {
//         if (status === window.google.maps.places.PlacesServiceStatus.OK) {
//           console.log(results, "====== service ======");
//           setCoordsResult(results);
//           if (pagination.hasNextPage) {
//             pagination.nextPage();
//           }
//         }
//       });
//     },
//     [setCoordsResult]
//   );
//   return (
//     <div>
//       <GoogleMap
//         center={center}
//         zoom={13}
//         onLoad={onMapLoad}
//         mapContainerStyle={{ height: "100vh", width: "100vw" }}
//       >
//         {coordsResult.length > 0 &&
//           coordsResult.map((result, i) => (
//             <Marker
//               key={i}
//               position={result.geometry.location}
//               onClick={() => setSelectedPlace(result)}
//             >
//               {selectedPlace &&
//                 selectedPlace.geometry.location.lat() ===
//                   result.geometry.location.lat() &&
//                 selectedPlace.geometry.location.lng() ===
//                   result.geometry.location.lng() && (
//                   <InfoWindow
//                     position={result.geometry.location}
//                     onCloseClick={() => setSelectedPlace(null)}
//                   >
//                     <span>{result.name}</span>
//                   </InfoWindow>
//                 )}
//             </Marker>
//           ))}
//       </GoogleMap>
//     </div>
//   );
// };

// export default Map;
import { useCallback, useContext } from "react";
import { LocationContext } from "./context/LocationContext";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import "./index.css";

const Map = () => {
  const {
    coordsResult,
    setCoordsResult,
    center,
    selectedPlace,
    setSelectedPlace,
  } = useContext(LocationContext);

  const onMapLoad = useCallback(
    (map) => {
      let request = {
        location: new window.google.maps.LatLng(47.583471, -122.035027),
        radius: "5000",
        types: ["gas_station"],
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
    [setCoordsResult]
  );

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
        console.log(place, "====== place details ======");
        setSelectedPlace(place);
      }
    });
  };

  return (
    <div>
      <GoogleMap
        center={center}
        zoom={13}
        onLoad={onMapLoad}
        mapContainerStyle={{ height: "100vh", width: "100vw" }}
      >
        {coordsResult.length > 0 &&
          coordsResult.map((result, i) => (
            <Marker
              key={i}
              position={result.geometry.location}
              onClick={() => fetchPlaceDetails(result.place_id)}
            >
              {selectedPlace &&
                selectedPlace.geometry.location.lat() ===
                  result.geometry.location.lat() &&
                selectedPlace.geometry.location.lng() ===
                  result.geometry.location.lng() && (
                  <InfoWindow
                    position={result.geometry.location}
                    onCloseClick={() => setSelectedPlace(null)}
                  >
                    <div>
                      <h2>{selectedPlace.name}</h2>
                      <p>Rating: {selectedPlace.rating}</p>
                      <p>Phone: {selectedPlace.formatted_phone_number}</p>
                      {selectedPlace.photos &&
                        selectedPlace.photos.length > 0 && (
                          <div className="image-container">
                            <img
                              className="image"
                              src={selectedPlace.photos[0].getUrl()}
                              alt="place"
                            />
                          </div>
                        )}
                    </div>
                  </InfoWindow>
                )}
            </Marker>
          ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
