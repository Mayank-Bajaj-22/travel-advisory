import axios from "axios";

const BASE_URL = "https://travel-advisor.p.rapidapi.com";

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(`${BASE_URL}/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        // limit: "30",
        // currency: "USD",
        // lang: "en_US",
        // lunit: "km",
        // subcategory: type === "hotels" ? "hotel,bb,specialty" : undefined,
        // ...(type === "hotels" && { adults: "1" }),
      },
      headers: {
        "x-rapidapi-key": "a23838c0demsh087144c00bc9d8ep1f463djsn8db0fc3a35fe",
        "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
      },
    });

    console.log("API Response:", data); // Debugging
    return data || [];
  } catch (error) {
    console.error("API Fetch Error:", error);
    return [];
  }
};
