import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; // Using react-icons instead of @material-ui/icons

const Header = ({ setCoordinates }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
      );
      const data = await res.json();
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    setCoordinates({ lat: Number(place.lat), lng: Number(place.lon) });
    setQuery(place.display_name);
    setSuggestions([]);
  };

  return (
    <header className="bg-[#121b4eff] text-white">
      {/* #121b4eff */}
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        <h1 className="text-xl font-semibold hidden sm:block">
          Travel Advisor
        </h1>

        <div className="flex items-center space-x-4 gap-3">
          <h2 className="text-lg hidden sm:block">Explore new places</h2>

          {/* <Autocomplete> */}
          <div className="relative rounded bg-white/20 hover:bg-white/30 w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-white" />
            </div>
            <input
              type="text"
              placeholder="Search…"
              value={query}
              onChange={handleSearch}
              className="pl-10 pr-3 py-2 w-full md:w-52 text-white placeholder-white bg-transparent border-none focus:outline-none"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-[9999] bg-white text-black rounded shadow-md w-full max-h-60 overflow-y-auto">
                {suggestions.map((place, i) => (
                  <li
                    key={i}
                    onClick={() => handleSelect(place)}
                    className="px-3 py-2 hover:bg-gray-200 cursor-pointer text-sm"
                  >
                    {place.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* </Autocomplete> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
