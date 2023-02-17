import { useNavigate } from "react-router-dom";

import { Button, Grid, GridItem } from "@chakra-ui/react";
import universe from "../../assets/pictures/Universe.webp";

const HomePage = () => {
  let navigate = useNavigate();

  const routeChange = () => {
    let path = `/data`;
    navigate(path);
  };

  return (
    <Grid
      templateAreas={`"main main"`}
      gridTemplateRows={"100vh 1fr"}
      gridTemplateColumns={"100vw 1fr"}
    >
      <GridItem
        pl="2"
        bg="green.300"
        area={"main"}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgImage={`url(${universe})`}
        bgSize="cover"
        bgRepeat="no-repeat"
      >
        <Button
          colorScheme="blackAlpha"
          size="lg"
          p="20"
          fontSize="5xl"
          onClick={routeChange}
        >
          Get started
        </Button>
      </GridItem>
    </Grid>
  );
};

export default HomePage;
