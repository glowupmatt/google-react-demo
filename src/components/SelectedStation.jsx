import { InfoWindow } from "@react-google-maps/api";
import PropTypes from "prop-types";
import "../index.css";

function SelectedStation({ selectedPlace, setSelectedPlace, result }) {
  if (!selectedPlace || !result) return null;

  return (
    <InfoWindow
      position={result.geometry.location}
      onCloseClick={() => setSelectedPlace(null)}
    >
      <div>
        <h2>{selectedPlace.name}</h2>
        <p>Rating: {selectedPlace.rating}</p>
        <p>Phone: {selectedPlace.formatted_phone_number}</p>
        {selectedPlace.photos && selectedPlace.photos.length > 0 && (
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
  );
}

SelectedStation.propTypes = {
  selectedPlace: PropTypes.shape({
    name: PropTypes.string,
    rating: PropTypes.number,
    formatted_phone_number: PropTypes.string,
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        getUrl: PropTypes.func.isRequired,
      })
    ),
  }),
  setSelectedPlace: PropTypes.func.isRequired,
  result: PropTypes.shape({
    geometry: PropTypes.shape({
      location: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};

export default SelectedStation;
