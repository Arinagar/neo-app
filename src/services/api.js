import axios from "axios";

axios.defaults.baseURL = "https://api.nasa.gov/neo/rest/v1";
axios.defaults.params = {
  api_key: "CznHZisDYfMkucbcWwQZnzoKJdwRuKXPuLqB7FeY",
};
// const oneDate = new Date("2023-02-01");

// const dateCounter = () => {
//   return oneDate.setDate(oneDate.getDate() + 1);
// };

// setInterval(() => {}, 5000);

export const fetchOneDayData = async () => {
  try {
    const response = await axios.get("/feed", {
      params: {
        start_date: `2023-02-01`,
        end_date: `2023-02-01`,
      },
    });

    return response.data.near_earth_objects;
  } catch (error) {
    console.log(error);
  }
};
