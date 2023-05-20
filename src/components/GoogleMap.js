import React, { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

function GoogleMapContainer({ bookings }) {
  const [map, setMap] = useState(null);
  const [directionResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDF2fpdZFDzi8elPD5Y__rwxIrPNFj2c0c",
    libraries: ["places"],
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const geocoder = new window.google.maps.Geocoder();

          geocoder.geocode(
            { location: { lat: latitude, lng: longitude } },
            (results, status) => {
              if (status === "OK" && results[0]) {
                const address = results[0].formatted_address;
                setUserLocation(address);
                console.log({ address });
              } else {
                console.error("Geocoder failed due to: " + status);
              }
            }
          );
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    setOrigin(userLocation);
    setDestination(bookings.place.address);
    console.log(destination);
  });

  const center = userLocation ? userLocation : { lat: 6.9906, lng: 0.2949 };

  async function calculateRoute() {
    if (!origin || !destination) {
      console.error("Origin or destination is missing.");
      return;
    }

    const directionService = new window.google.maps.DirectionsService();
    const results = await directionService.route({
      origin: origin,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });

    setDirectionResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionResponse(null);
    setDistance("");
    setDuration("");
    setOrigin("");
    setDestination("");
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  console.log({ origin }, { destination });

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div className="flex justify-between">
        <button
          className="my-4 w-1/2 text-xl font-semibold text-white bg-primary py-2 px-4 rounded-2xl mr-6"
          onClick={calculateRoute}>
          Get Location
        </button>
        <div className="w-full text-xl flex items-center font-semibold text-blue-800">
          Distance: {distance}
        </div>
        <div className="w-full text-xl flex items-center font-semibold text-blue-800">
          Duration: {duration}
        </div>
      </div>
      {isLoaded && (
        <GoogleMap
          center={center}
          zoom={10}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            zoomControl: true,
            streetView: false,
            mapTypeControl: false,
            fullscreenControl: true,
          }}
          onLoad={(map) => {
            setMap(map);
          }}>
          <Marker position={center} />
          {directionResponse && (
            <DirectionsRenderer directions={directionResponse} />
          )}
        </GoogleMap>
      )}
    </div>
  );
}

export default GoogleMapContainer;
