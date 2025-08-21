import React, { useState, useEffect, createRef } from "react";
import PlaceDetails from "./PlaceDetails";
import CircularProgress from "@mui/material/CircularProgress";

const List = ({
  places,
  listRefs,
  selectedPlaceIndex,
  childClicked,
  isLoading,
  type,
  setType,
  rating,
  setRating,
}) => {
  // const [rating, setRating] = useState("restaurents");
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    setElRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [places]);

  return (
    <div className="p-1 flex flex-col h-[85vh]">
      <h2 className="text-2xl font-semibold mb-4">Hotels, Attractions and Restaurants around you</h2>
      {isLoading ? (
        <div className="h-[600px] flex justify-center items-center">
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <div className="flex gap-9">
            <div className="mb-6">
              <label
                htmlFor="type"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="block w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value="restaurants">Restaurants</option>
                <option value="hotels">Hotels</option>
                <option value="attractions">Attractions</option>
              </select>
            </div>
            <div className="mb-6">
              <label
                htmlFor="type"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Rating
              </label>
              <select
                id="rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="block w-full p-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              >
                <option value={0}>All</option>
                <option value={3}>Above 3.0</option>
                <option value={4}>Above 4.0</option>
                <option value={4.5}>Above 4.5</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 h-[75vh] overflow-y-auto space-y-4">
            {places?.map((place, i) => (
              <div key={i}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClicked) == i}
                  refProp={elRefs[i]}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default List;
