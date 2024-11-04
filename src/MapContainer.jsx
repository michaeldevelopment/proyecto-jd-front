import React, { useState } from "react";
import GoogleMapReact from "google-map-react";

const Marker = ({ text }) => (
  <div
    style={{
      color: "red",
      backgroundColor: "white",
      padding: "5px 10px",
      borderRadius: "50%",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transform: "translate(-50%, -50%)",
    }}
  >
    {text}
  </div>
);

const MapContainer = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleMapClick = ({ lat, lng }) => {
    // Set the selected city based on the click event
    setSelectedCity({ lat, lng });
    console.log(`Latitude: ${lat}, Longitude: ${lng}`);
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "YOUR_GOOGLE_MAPS_API_KEY" }} // Replace with your API Key
        defaultCenter={{ lat: 4.5709, lng: -74.2973 }} // Colombia's coordinates
        defaultZoom={6}
        onClick={handleMapClick}
      >
        {selectedCity && (
          <Marker
            lat={selectedCity.lat}
            lng={selectedCity.lng}
            text="Selected"
          />
        )}
      </GoogleMapReact>

      {selectedCity && (
        <div>
          <h2>Selected City Coordinates:</h2>
          <p>Latitude: {selectedCity.lat}</p>
          <p>Longitude: {selectedCity.lng}</p>
        </div>
      )}
    </div>
  );
};

export default MapContainer;
