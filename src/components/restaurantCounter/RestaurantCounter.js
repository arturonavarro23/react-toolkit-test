import React, { useEffect } from 'react';
import { Heading } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import {
  getRestaurantList,
} from '../../store/actions/restaurantListActions';

const RestaurantCounter = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const { total, } = useSelector(
    (state) => state.restaurantList,
  );

  useEffect(() => {
    if (location.pathname !== '/' && total < 1) {
      dispatch(getRestaurantList(1))
    }
  }, [dispatch, location, total])

  return (
    <Heading as="h6" textAlign="center" fontSize="1.2em">
      Total Restaurants: {total}
    </Heading>
  );
};

export default RestaurantCounter;
