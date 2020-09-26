import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Heading,
  Image,
  Stack,
  Text,
  Flex,
} from '@chakra-ui/core';
import Form from '../../components/form';
import useGetRestaurantById from '../../hooks/useGetRestaurantById';
import useUpdateRestaurant from '../../hooks/useUpdateRestaurant';

const Details = () => {
  const { id } = useParams();
  const { data: restaurant, status } = useGetRestaurantById(id);
  const [updateRestaurant] = useUpdateRestaurant();

  const onSubmit = (values) => {
    updateRestaurant({
      ...restaurant,
      ...values,
    });
  };

  if (status === 'loading') {
    return null;
  }

  if (status === 'error') {
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
      <Flex direction={{ xs: 'column', lg: 'row' }}>
        <Stack
          w={{ xs: '100%', lg: '500px' }}
          marginRight={{ xs: '0', lg: '20px' }}
        >
          <Box>
            <Image size="200px" src={restaurant.img} alt={restaurant.name} />
          </Box>
          <Box>
            <Text>Raiting: {restaurant.raiting}</Text>
            <Text>Address: {restaurant.address}</Text>
          </Box>
        </Stack>
        <Form
          onSubmit={onSubmit}
          isLoading={false}
          defaultValues={restaurant}
        />
      </Flex>
    </>
  );
};

export default Details;
