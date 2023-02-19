import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import { Box } from "@chakra-ui/react";

import { fetchData } from "../../services/api";
import DataCard from "../DataCard/DataCard";

const DaysList = () => {
  const [neo, setNeo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const today = new Date();
  const initialDate = new Date(today.getFullYear(), today.getMonth(), 1);
  const daysToLoop = Math.floor(
    (today.getTime() - initialDate.getTime()) / 86400000
  );
  const intervalTime = 5000;

  function addDay(someDay, daysToAdd) {
    let current_date = new Date(someDay);
    current_date.setDate(current_date.getDate() + daysToAdd);

    const formatted_date =
      current_date.getFullYear() +
      "-" +
      (current_date.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      current_date.getDate().toString().padStart(2, "0");

    return formatted_date;
  }

  useEffect(() => {
    const fetchNeos = async (inputDate) => {
      setError("");

      try {
        const data = await fetchData(inputDate);
        const transformData = Object.entries(data).map(([key, value]) => {
          return { key, value };
        });
        setNeo((prevNeo) => [...prevNeo, ...transformData]);
      } catch (error) {
        setError("something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    let currentDate = new Date(initialDate);

    const interval = setInterval(() => {
      const formattedDate =
        currentDate.getFullYear() +
        "-" +
        (currentDate.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        currentDate.getDate().toString().padStart(2, "0");

      fetchNeos(formattedDate);

      currentDate.setDate(currentDate.getDate() + 1);

      if (currentDate > new Date(addDay(initialDate, daysToLoop))) {
        currentDate = new Date(initialDate);
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  const hazardousNEOs = neo.flatMap((el) =>
    el.value.filter((item) => item.is_potentially_hazardous_asteroid === true)
  );

  const hazardousDays = [
    ...new Set(
      hazardousNEOs.map((el) => el.close_approach_data[0].close_approach_date)
    ),
  ];

  const hazardousNEOsCount = hazardousDays.reduce((acc, day) => {
    const count = hazardousNEOs.filter(
      (neo) => neo.close_approach_data[0].close_approach_date === day
    ).length;
    acc[day] = count;
    return acc;
  }, {});

  const sortedHazardousDays = Object.entries(hazardousNEOsCount).sort(
    (a, b) => b[1] - a[1]
  );
  const redFlag = sortedHazardousDays.slice(0, 2).map((el) => el[0]);

  // console.log(sortedHazardousDays.slice(0, 2).map((el) => el[0]));

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      gap="20px"
      width="1200px"
    >
      {neo.length > 0 &&
        !isLoading &&
        neo.map((el) => {
          if (neo.length > 6) {
            neo.shift();
          }
          return (
            <DataCard
              data={el.value}
              key={nanoid(10)}
              time={el.key}
              redFlag={redFlag}
            />
          );
        })}
    </Box>
  );
};

export default DaysList;
