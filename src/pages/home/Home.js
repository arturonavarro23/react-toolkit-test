import React from 'react';
import {
  Flex,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/core';
import useGetRestaurants from '../../hooks/useGetRestaurants';

const Home = () => {
  const { status, data } = useGetRestaurants();
  console.log(status, data);

  return (
    <Flex direction={{ xs: 'column', sm: 'row' }}>
      <Flex flex={1} p={5} pr={0}>
        <Heading as="h6" textAlign="center" fontSize="1.2em">
          Restaurant Counter
        </Heading>
      </Flex>
      <Flex flex={3} p={5} direction="column">
        <Heading as="h6" fontSize="1.2em">
          Restaurant List
        </Heading>
        {status === 'error' && (
          <Alert status="error" w={{ sm: '100%', lg:'30%' }} mt="1.5em" variant="left-accent">
            <AlertIcon />
            <AlertTitle mr={2}>Error</AlertTitle>
          </Alert>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
