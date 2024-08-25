import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

interface Card {
  organization: string;
  availableFood: string;
  tags: string[];
  address: string;
  pax: number;
}

interface MapProps {
  cardData: Card[];
}

const MapMarkers: React.FC<MapProps> = ({ cardData }) => {
  const [markers, setMarkers] = useState<google.maps.LatLngLiteral[]>([]);
  const [mapCenter, setMapCenter] = useState({ lat: 1.3521, lng: 103.8198 }); // Default center (Singapore)
  
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBAFDKKOMyejno9kqGkgjhOVwKG3B49n4U',
    libraries: ['places'],
  });

  useEffect(() => {
    if (!isLoaded) return;

    const geocoder = new google.maps.Geocoder();
    const addresses = cardData.map(card => card.address);

    const geocodeAddress = (address: string) => {
      return new Promise<google.maps.LatLngLiteral>((resolve, reject) => {
        geocoder.geocode({ address }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            const location = results[0].geometry.location.toJSON();
            resolve(location);
          } else {
            reject(`Geocode error for address "${address}": ${status}`);
          }
        });
      });
    };

    const autocompleteAddress = async (address: string) => {
      return new Promise<string>((resolve, reject) => {
        const service = new google.maps.places.AutocompleteService();
        service.getPlacePredictions({ input: address }, (predictions, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && predictions && predictions.length > 0) {
            resolve(predictions[0].description);
          } else {
            reject(`Autocomplete error for address "${address}": ${status}`);
          }
        });
      });
    };

    Promise.all(
      addresses.map(async (address) => {
        try {
          const formattedAddress = await autocompleteAddress(address);
          return await geocodeAddress(formattedAddress);
        } catch (error) {
          console.error(error);
          return null;
        }
      })
    )
      .then(results => {
        const validResults = results.filter((result): result is google.maps.LatLngLiteral => result !== null);
        if (validResults.length > 0) {
          console.log('Geocoded locations:', validResults); // Debugging statement
          setMarkers(validResults);
          setMapCenter(validResults[0]);
        }
      })
      .catch(error => console.error("Error geocoding addresses:", error));
  }, [cardData, isLoaded]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="map-markers-container">
      <GoogleMap
        mapContainerStyle={{ height: '100%', width: '100%' }}
        center={mapCenter}
        zoom={12}
      >
        {markers.map((position, index) => (
          <Marker key={index} position={position} />
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapMarkers;
