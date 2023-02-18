import axios from "axios";

axios.defaults.baseURL = "https://api.nasa.gov/neo/rest/v1";
axios.defaults.params = {
  api_key: "CznHZisDYfMkucbcWwQZnzoKJdwRuKXPuLqB7FeY",
};

export const fetchData = async (startDate) => {
  // Define the function to add one day to a given date
  function addDay(someDay) {
    const start_date = new Date(someDay);
    const end_date = new Date();
    let count = 0;
    for (
      let firstDay = start_date;
      firstDay <= end_date;
      firstDay.setDate(firstDay.getDate() + 1)
    ) {
      const month = firstDay.getMonth() + 1;
      const day = firstDay.getDate();
      const year = firstDay.getFullYear();

      const date = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;

      if (firstDay.getDate() === end_date.getDate()) {
        firstDay = start_date;
      }

      return date;
    }
  }

  // Call addDay to get the end date
  const endDate = addDay(startDate);

  try {
    const response = await axios.get("/feed", {
      params: {
        start_date: startDate,
        end_date: endDate,
      },
    });

    return response.data.near_earth_objects;
  } catch (error) {
    console.log(error);
  }
};
