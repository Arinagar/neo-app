import axios from "axios";

axios.defaults.baseURL = "https://api.nasa.gov/neo/rest/v1";
axios.defaults.params = {
  api_key: "CznHZisDYfMkucbcWwQZnzoKJdwRuKXPuLqB7FeY",
};

export const fetchData = async (infoDay) => {
  try {
    const response = await axios.get("/feed", {
      params: {
        start_date: infoDay,
        end_date: infoDay,
      },
    });

    return response.data.near_earth_objects;
  } catch (error) {
    console.log(error);
  }
};
