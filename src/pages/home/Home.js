import React from 'react';
import {
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  Stack,
  Box,
  Image,
  Flex,
} from '@chakra-ui/core';
import useGetRestaurants from '../../hooks/useGetRestaurants';
import useCreateRestaurant from '../../hooks/useCreateRestaurant';
import Form from '../../components/form';
import { Link } from 'react-router-dom';

const Home = () => {
  const { status, data } = useGetRestaurants();
  const [createRestaurant, { isLoading, isSuccess }] = useCreateRestaurant();

  const onSubmit = (values) => {
    createRestaurant(values);
  };

  return (
    <>
      <Heading as="h6" fontSize="1.2em">
        Restaurant List
      </Heading>
      {status === 'error' && (
        <Alert
          status="error"
          w={{ sm: '100%', lg: '30%' }}
          mt="1.5em"
          variant="left-accent"
        >
          <AlertIcon />
          <AlertTitle mr={2}>Error</AlertTitle>
        </Alert>
      )}
      <Flex direction={{ xs: 'column', lg: 'row' }}>
        <Flex
          w={{ xs: '100%', lg: '500px' }}
          direction="column"
          marginTop={10}
          marginRight={{ xs: '0', lg: '20px' }}
        >
          {status === 'success' &&
            data.map((d) => (
              <Stack key={d.name} isInline marginBottom="15px">
                <Box marginRight="20px">
                  <Image height="30px" src={d.img} alt={d.name} />
                </Box>
                <Box d="flex" flex={1}>
                  <Link to={`/restaurant/${d.id}`}>{d.name}</Link>
                </Box>
              </Stack>
            ))}
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
