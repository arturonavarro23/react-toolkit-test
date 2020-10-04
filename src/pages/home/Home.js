import React, { useEffect } from 'react';
import { Heading, Flex } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import {
  getRestaurantList,
  createRestaurant,
} from '../../store/actions/restaurantListActions';
import { useQueryParams } from '../../hooks/useQueryParams';
import Form from '../../components/form';
import Error from '../../components/error';
import RestaurantList from './components/restaurantList';

const Home = () => {
  const { page = 1 } = useQueryParams();
  const dispatch = useDispatch();
  const {
    items,
    error,
    pagination,
    loading,
    createLoading,
    restaurantIsCreated,
  } = useSelector((state) => state.restaurantList);

  useEffect(() => {
    dispatch(getRestaurantList(page));
  }, [page, dispatch]);

  function onSubmit(values) {
    dispatch(createRestaurant(values));
  }

  return (
    <>
      <Heading as="h6" fontSize="1.2em">
        Restaurant List
      </Heading>
      <Flex direction={{ xs: 'column', lg: 'row' }}>
        <Flex
          w={{ xs: '100%', lg: '500px' }}
          direction="column"
          marginTop={10}
          marginRight={{ xs: '0', lg: '20px' }}
        >
          {error && <Error />}
          {items.length > 0 && !error && (
            <RestaurantList
              isFetching={loading === 'pending'}
              restaurants={items}
              pagination={pagination}
            />
          )}
        </Flex>
        <Form
          onSubmit={onSubmit}
          isLoading={createLoading === 'pending'}
          clearValues={restaurantIsCreated}
        />
      </Flex>
    </>
  );
};

export default Home;
