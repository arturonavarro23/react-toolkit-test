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
  Button,
  Text,
} from '@chakra-ui/core';
import { Link, useHistory } from 'react-router-dom';
import useGetPaginatedRestaurants from '../../hooks/useGetPaginatedRestaurants';
import useCreateRestaurant from '../../hooks/useCreateRestaurant';
import useQueryParams from '../../hooks/useQueryParams';
import Form from '../../components/form';

const Home = () => {
  const { page = 1 } = useQueryParams();
  const history = useHistory();
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
          {status === 'success' && (
            <>
              {resolvedData.restaurants.map((d) => (
                <Stack key={d.name} isInline marginBottom="15px">
                  <Box marginRight="20px">
                    <Image height="40px" src={d.img} alt={d.name} />
                  </Box>
                  <Box d="flex" flex={1} alignItems="center">
                    <Link to={`/restaurant/${d.id}`}>{d.name}</Link>
                  </Box>
                </Stack>
              ))}
              <Stack isInline marginBottom="15px">
                <Button
                  variantColor="teal"
                  size="xs"
                  isDisabled={!latestData?.pagitnation?.prev}
                  onClick={() =>
                    history.push(`/?page=${latestData.pagitnation.prev}`)
                  }
                >
                  Prev
                </Button>
                <Text mx="10px">
                  {`${resolvedData.pagitnation.current}/${resolvedData.pagitnation.pages}`}
                </Text>
                <Button
                  variantColor="teal"
                  size="xs"
                  isDisabled={!latestData?.pagitnation?.next}
                  onClick={() =>
                    history.push(`/?page=${latestData.pagitnation.next}`)
                  }
                >
                  Next
                </Button>
                {isFetching && <Text ml="10px">Loading...</Text>}
              </Stack>
            </>
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
