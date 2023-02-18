import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import { Box } from "@chakra-ui/react";

import { fetchData } from "../../services/api";
import DataCard from "../DataCard/DataCard";

const DaysList = () => {
  const [neo, setNeo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNeos = async () => {
      setError("");
      const startDate = "2023-02-01";
      try {
        const data = await fetchData(startDate);
        const transformData = Object.entries(data).map(([key, value]) => {
          return { key, value };
        });
        setNeo(transformData);
      } catch (error) {
        setError("something went wrong");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNeos();

    const interval = setInterval(() => {
      fetchNeos();

      return () => clearInterval(interval);
    }, 5000);
  }, []);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      gap="20px"
    >
      {neo.length > 0 &&
        !isLoading &&
        neo
          .sort((a, b) => {
            if (a.key < b.key) {
              return -1;
            }
            if (a.key > b.key) {
              return 1;
            }
            return 0;
          })
          .map((el) => {
            if (neo.length > 6) {
              neo.shift();
            }
            return <DataCard data={el.value} key={nanoid(10)} time={el.key} />;
          })}
    </Box>
  );
};

export default DaysList;
