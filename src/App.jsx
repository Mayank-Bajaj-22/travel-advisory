import React, { useEffect, useState } from "react";
import { getPlacesData } from "./api";
import Header from "./components/Header";
import List from "./components/List";
import Map from "./components/Map";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  // Set user's current location on first load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      },
      () => {
        // fallback to New Delhi if permission denied
        setCoordinates({ lat: 28.6139, lng: 77.209 });
      }
    );
  }, []);

  // Fetch data when coordinates and bounds are ready
useEffect(() => {
  if (bounds && bounds.sw && bounds.ne && bounds.sw.lat && bounds.ne.lat) {
    const timeout = setTimeout(() => {
      setIsLoading(true);

      getPlacesData(type, bounds.sw, bounds.ne)
        .then((data) => {
          const filtered = data?.filter(
            (place) =>
              place.name &&
              place.num_reviews > 0 &&
              (rating ? Number(place.rating) >= rating : true)
          );
          console.log("Places fetched:", filtered);
          setPlaces(filtered);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 1000);

    return () => clearTimeout(timeout);
  }
}, [type, bounds, rating]); // ✅ added rating as dependency


  return (
    <>
      <Header setCoordinates={setCoordinates} />
      <div className="w-full px-4 md:px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <List
              places={places}
              childClicked={childClicked}
              isLoading={isLoading}
              type={type}
              setType={setType}
              rating={rating}
              setRating={setRating}
            />
          </div>
          <div className="md:col-span-2">
            <Map
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              coordinates={coordinates}
              places={places}
              setChildClicked={setChildClicked}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
