import { Grid, GridItem } from "@chakra-ui/react";

import universe from "../../assets/pictures/Universe.webp";
import DaysList from "../DaysList/DaysList";

const DataPage = () => {
  return (
    <Grid
      templateAreas={`"main main"`}
      gridTemplateRows={"100vh 1fr"}
      gridTemplateColumns={"100vw 1fr"}
    >
      <GridItem
        area={"main"}
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        bgImage={`url(${universe})`}
        bgSize="cover"
        bgRepeat="no-repeat"
      >
        <DaysList />
      </GridItem>
    </Grid>
  );
};

export default DataPage;
