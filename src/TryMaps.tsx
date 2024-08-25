import React, { useState, useEffect, useRef } from "react";
import { LoadScript, Autocomplete, DistanceMatrixService } from "@react-google-maps/api";

const libraries = ["places"];

const DistanceCalculator = () => {
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [distance, setDistance] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  const apiKey = "AIzaSyBAFDKKOMyejno9kqGkgjhOVwKG3B49n4U";

  const autocompleteRef1 = useRef(null);
  const autocompleteRef2 = useRef(null);

  const onPlaceChanged1 = () => {
    const place = autocompleteRef1.current.getPlace();
    setAddress1(place.formatted_address);
    setOrigin(place.geometry.location);
  };

  const onPlaceChanged2 = () => {
    const place = autocompleteRef2.current.getPlace();
    setAddress2(place.formatted_address);
    setDestination(place.geometry.location);
  };

  const handleDistanceMatrixResponse = (response) => {
    if (response.rows[0].elements[0].status === "OK") {
      setDistance(response.rows[0].elements[0].distance.text);
    } else {
      console.error("Error calculating distance");
    }
  };

  useEffect(() => {
    if (origin && destination) {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: "DRIVING",
        },
        handleDistanceMatrixResponse
      );
    }
  }, [origin, destination]);

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={libraries}>
      <div>
        <h1>Distance Calculator</h1>
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef1.current = autocomplete)}
          onPlaceChanged={onPlaceChanged1}
        >
          <input
            type="text"
            placeholder="Enter address"
          />
        </Autocomplete>
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef2.current = autocomplete)}
          onPlaceChanged={onPlaceChanged2}
        >
          <input
            type="text"
            placeholder="Enter address"
          />
        </Autocomplete>

        {distance && (
          <div>
            <h2>Distance: {distance}</h2>
          </div>
        )}
      </div>
    </LoadScript>
  );
};

export default DistanceCalculator;

