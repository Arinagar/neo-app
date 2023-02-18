import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

const DataCard = ({ data, time }) => {
  function getMaxOfArray(numArray) {
    return Math.max
      .apply(null, numArray)
      .toLocaleString("en")
      .replace(".", ",");
  }

  function getMinOfArray(numArray) {
    return Math.min.apply(null, numArray).toLocaleString("en");
  }

  const maxDiameter = getMaxOfArray(
    data.map((el) =>
      el.estimated_diameter.kilometers.estimated_diameter_max.toFixed(3)
    )
  )
    .split(" ")
    .join(",");

  const potentialHazard = data.reduce((reducer, el) => {
    if (el.is_potentially_hazardous_asteroid === true) {
      return reducer + 1;
    } else {
      return reducer;
    }
  }, 0);

  const maxVelocity = getMaxOfArray(
    data.map((el) =>
      Number(
        Math.round(
          el.close_approach_data[0].relative_velocity.kilometers_per_hour
        )
      )
    )
  );

  const closestNeo = getMinOfArray(
    data.map((el) =>
      Number(Math.round(el.close_approach_data[0].miss_distance.kilometers))
    )
  );

  return (
    <Card opacity="0.87">
      <CardHeader>
        <Heading size="md">{time}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              {maxDiameter} km
            </Heading>
            <Text pt="2" fontSize="sm">
              Max diameter of NEO per day
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              {potentialHazard} pcs
            </Heading>
            <Text pt="2" fontSize="sm">
              Number of potentially hazardous NEOs
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              {closestNeo} km
            </Heading>
            <Text pt="2" fontSize="sm">
              Distance between Earth and closest NEO
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              {maxVelocity} kmph
            </Heading>
            <Text pt="2" fontSize="sm">
              Speed of the fastest NEO
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default DataCard;
