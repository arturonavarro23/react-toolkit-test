import React, { useEffect, useState } from 'react';
import { FormLabel, FormControl, Input, Box, Text } from '@chakra-ui/core';
import { Link } from 'react-router-dom';

import useSearchRestaurant from '../../hooks/useSearchRestaurant';

const SearchByName = () => {
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const { data } = useSearchRestaurant(debouncedTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(term);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [term]);

  return (
    <>
      <FormControl mt="20px">
        <FormLabel>Search by name:</FormLabel>
        <Input
          name="name"
          type="text"
          onChange={(e) => setTerm(e.target.value)}
          autoComplete="off"
        />
      </FormControl>
      {data &&
        data.map((r) => (
          <Box key={r.id} mt="5px">
            <Text as={Link} to={`/restaurant/${r.id}`}>
              {r.name}
            </Text>
          </Box>
        ))}
    </>
  );
};

export default SearchByName;
