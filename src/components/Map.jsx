import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useMediaQuery } from "@mui/material";
import Rating from "@mui/material/Rating";

// Fix for Leaflet marker icons not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to handle map movement
const MapEventsHandler = ({ setCoordinates, setBounds }) => {
  useMapEvents({
    moveend: (e) => {
      const map = e.target;
      const center = map.getCenter();
      const bounds = map.getBounds();

      setCoordinates({ lat: center.lat, lng: center.lng });
      setBounds({
        ne: {
          lat: bounds.getNorthEast().lat,
          lng: bounds.getNorthEast().lng,
        },
        sw: {
          lat: bounds.getSouthWest().lat,
          lng: bounds.getSouthWest().lng,
        },
      });
    },
  });

  return null;
};

const Map = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  weatherData,
  setChildClicked,
}) => {
  const defaultCoords = { lat: 28.6139, lng: 77.2090 };
  const currentCoords = coordinates?.lat ? coordinates : defaultCoords;
  const isDesktop = useMediaQuery("(min-width: 640px)");

  return (
    <div className="h-[85vh] w-full rounded-md overflow-hidden shadow-lg">
      <MapContainer
        center={[currentCoords.lat, currentCoords.lng]}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapEventsHandler
          setCoordinates={setCoordinates}
          setBounds={setBounds}
        />

        {/* Current Location Marker */}
        <Marker position={[currentCoords.lat, currentCoords.lng]}>
          <Popup>You are here</Popup>
        </Marker>

        {/* Place Markers */}
        {places?.map((place, i) => {
          const lat = Number(place.latitude);
          const lng = Number(place.longitude);

          if (!lat || !lng) return null;

          return (
            <Marker
              key={i}
              position={[lat, lng]}
              eventHandlers={{
                click: () => setChildClicked(i),
              }}
            >
              <Popup>
                <div className="w-[200px] space-y-2">
                  <p className="text-lg font-semibold text-gray-800">
                    {place.name}
                  </p>
                  {isDesktop && (
                    <>
                      <img
                        src={
                          place?.photo?.images?.large?.url ??
                          "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                        }
                        alt={place.name}
                        className="w-full h-28 object-cover rounded"
                      />
                      <div className="text-sm text-yellow-500">
                        ⭐ {Number(place.rating) || "N/A"} / 5
                      </div>
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Weather Overlays */}
        {weatherData?.list?.length > 0 &&
          weatherData.list.map((data, i) => (
            <Marker
              key={`weather-${i}`}
              position={[data.coord.lat, data.coord.lon]}
              icon={L.icon({
                iconUrl: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
                iconSize: [50, 50],
              })}
            >
              <Popup>
                <span className="text-sm">{data.weather[0].description}</span>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default Map;
