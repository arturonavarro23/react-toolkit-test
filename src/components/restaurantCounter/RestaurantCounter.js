import React from 'react';
import { Heading } from '@chakra-ui/core';

import { useSelector } from 'react-redux';

const RestaurantCounter = () => {
  const { total } = useSelector(
    (state) => state.restaurantList,
  );

  return (
    <Heading as="h6" textAlign="center" fontSize="1.2em">
      Total Restaurants: {total}
    </Heading>
  );
};

export default RestaurantCounter;
