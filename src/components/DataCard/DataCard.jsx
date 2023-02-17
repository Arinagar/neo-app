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
  data[0].map((el) => console.log(el.close_approach_data[0]));

  function getMaxOfArray(numArray) {
    return Math.max.apply(null, numArray).toLocaleString("en");
  }

  function getMinOfArray(numArray) {
    return Math.min.apply(null, numArray).toLocaleString("en");
  }

  const maxVelocity = getMaxOfArray(
    data[0].map((el) =>
      Number(
        Math.round(
          el.close_approach_data[0].relative_velocity.kilometers_per_hour
        )
      )
    )
  );

  const closestNeo = getMinOfArray(
    data[0].map((el) =>
      Number(Math.round(el.close_approach_data[0].miss_distance.kilometers))
    )
  );

  return (
    <Card>
      <CardHeader>
        <Heading size="md">{time}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Max diameter
            </Heading>
            <Text pt="2" fontSize="sm">
              View a summary of all your cliensts over the last month.
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Potentially hazardous NEOs
            </Heading>
            <Text pt="2" fontSize="sm">
              Check out the overview of your clients.
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
