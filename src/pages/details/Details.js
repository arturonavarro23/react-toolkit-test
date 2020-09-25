import React from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/core";
import useGetRestaurantById from "../../hooks/useGetRestaurantById";

const Details = () => {
  const { id } = useParams();
  const { data: restaurant, status } = useGetRestaurantById(id);
  console.log(restaurant);

  if (status === "loading") {
    return null;
  }

  if (status === "error") {
    return (
      <Alert status="error" w="100%" mt="1.5em" variant="left-accent">
        <AlertIcon />
        <AlertTitle mr={2}>Error</AlertTitle>
      </Alert>
    );
  }

  return (
    <>
      <Heading>{restaurant.name}</Heading>
      <Stack>
        <Box>
          <Image size="200px" src={restaurant.img} alt={restaurant.name} />
        </Box>
        <Box>
          <Text>Raiting: {restaurant.raiting}</Text>
          <Text>Address: {restaurant.address}</Text>
        </Box>
      </Stack>
    </>
  );
};

export default Details;
