import React from 'react';
import { Heading, Flex } from '@chakra-ui/core';
import useGetPaginatedRestaurants from '../../hooks/useGetPaginatedRestaurants';
import useCreateRestaurant from '../../hooks/useCreateRestaurant';
import useQueryParams from '../../hooks/useQueryParams';
import Form from '../../components/form';
import Error from '../../components/error';
import RestaurantList from './components/restaurantList';

const Home = () => {
  const { page = 1 } = useQueryParams();

  const {
    status,
    resolvedData,
    latestData,
    isFetching,
  } = useGetPaginatedRestaurants(page);
  const [createRestaurant, { isLoading, isSuccess }] = useCreateRestaurant();
  const onSubmit = (values) => {
    createRestaurant(values);
  };

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
          {status === 'error' && <Error />}
          {status === 'success' && (
            <RestaurantList
              isFetching={isFetching}
              restaurants={resolvedData.restaurants}
              pagination={latestData?.pagination}
            />
          )}
        </Flex>
        <Form
          onSubmit={onSubmit}
          isLoading={isLoading}
          clearValues={!isLoading && isSuccess}
        />
      </Flex>
    </>
  );
};

export default Home;
