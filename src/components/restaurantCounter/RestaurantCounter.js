import React from 'react';
import { Heading } from "@chakra-ui/core";

import useGetRestaurants from "../../hooks/useGetRestaurants";

const RestaurantCounter = () => {
  const { data } = useGetRestaurants();
  return (
    <Heading as="h6" textAlign="center" fontSize="1.2em">
      Total Restaurants: {data && data.length}
    </Heading>
  );
};

export default RestaurantCounter;
