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
        limit: "30",
        currency: "USD",
        lang: "en_US",
        lunit: "km",
        subcategory: type === "hotels" ? "hotel,bb,specialty" : undefined,
        ...(type === "hotels" && { adults: "1" }),
      },
      headers: {
        "x-rapidapi-key": "0c09f23658msh53c4e6f0423cb9cp12194ejsn3aa701e7efc2",
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
