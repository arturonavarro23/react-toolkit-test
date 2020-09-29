import React from 'react';
import {
  Stack,
  Box,
  Image,
  Button,
  Text,
} from '@chakra-ui/core';
import { Link, useHistory } from 'react-router-dom';

const RestaurantList = ({ restaurants, pagination, isFetching }) => {
  const history = useHistory();
  return (
    <>
      {restaurants.map((d) => (
        <Stack key={d.name} isInline marginBottom="15px">
          <Box marginRight="20pxº">
            <Image height="40px" src={d.img} alt={d.name} />
          </Box>
          <Box d="flex" flex={1} alignItems="center">
            <Link to={`/restaurants/${d.id}`}>{d.name}</Link>
          </Box>
        </Stack>
      ))}
      <Stack isInline marginBottom="15px">
        <Button
          variantColor="teal"
          size="xs"
          isDisabled={!pagination?.prev}
          onClick={() => history.push(`/?page=${pagination.prev}`)}
        >
          Prev
        </Button>
        <Text mx="10px">
          {`${pagination?.current}/${pagination?.pages}`}
        </Text>
        <Button
          variantColor="teal"
          size="xs"
          isDisabled={!pagination?.next}
          onClick={() => history.push(`/?page=${pagination.next}`)}
        >
          Next
        </Button>
        {isFetching && <Text ml="10px">Loading...</Text>}
      </Stack>
    </>
  );
};

export default RestaurantList;
