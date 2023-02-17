import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { fetchOneDayData } from "../../services/api";
import DataCard from "../DataCard/DataCard";

const DaysList = () => {
  // const cards = [];
  // for (let i = 0; i < 6; i += 1) {
  //   cards.push(<DataCard key={i} />);
  // }

  // cards.slice(0, 6 + i);

  const [neo, setNeo] = useState([]);
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNeos = async () => {
      setError("");

      try {
        const data = await fetchOneDayData();
        setNeo(Object.values(data));
        setTime(Object.keys(data));
      } catch (error) {
        setError("something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNeos();
  }, []);

  return (
    <Box
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      justifyContent="center"
      gap="20px"
    >
      {neo.length > 0 && <DataCard data={neo} time={time} />}
    </Box>
  );
};

export default DaysList;
