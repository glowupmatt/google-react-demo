import { useContext } from "react";
import { LocationContext } from "../context/LocationContext";

function ListOfStations() {
  const { coordsResult, setSelectedPlace } = useContext(LocationContext);

  console.log(coordsResult);
  return (
    <div className="stations-list-container">
      {coordsResult.length > 0 &&
        coordsResult.map((result, i) => (
          <div
            key={i}
            className="station-container"
            onClick={() => setSelectedPlace(result)}
          >
            <h3>{result.name}</h3>
            <p>{result.vicinity}</p>
          </div>
        ))}
    </div>
  );
}

export default ListOfStations;
