import React from 'react';
import {
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  SimpleGrid,
  Box,
  Image,
} from '@chakra-ui/core';
import useGetRestaurants from '../../hooks/useGetRestaurants';

const Home = () => {
  const { status, data } = useGetRestaurants();
  console.log(status, data);

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
      {status === 'success' && (
        <SimpleGrid columns={{ xs: 2, lg: 5 }} spacing={10} marginTop={10}>
          {data.map((d) => (
            <React.Fragment key={d.name}>
              <Box>
                <Image height="100px" src={d.img} alt={d.name} />
              </Box>
              <Box d={{ xs: 'none', lg: 'flex' }} alignItems="center">
                {d.id}
              </Box>
              <Box d="flex" alignItems="center">
                {d.name}
              </Box>
              <Box d={{ xs: 'none', lg: 'flex' }} alignItems="center">
                {d.address}
              </Box>
              <Box d={{ xs: 'none', lg: 'flex' }} alignItems="center">
                {d.raiting}
              </Box>
            </React.Fragment>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};

export default Home;
