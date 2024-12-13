import { useContext } from "react";
import { LocationContext } from "../context/LocationContext";

function ListOfStations() {
  const { coordsResult } = useContext(LocationContext);

  console.log(coordsResult);
  return (
    <div>
      {coordsResult.length > 0 &&
        coordsResult.map((result, i) => (
          <div key={i}>
            <h3>{result.name}</h3>
            <p>{result.vicinity}</p>
          </div>
        ))}
    </div>
  );
}

export default ListOfStations;
