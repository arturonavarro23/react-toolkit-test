import React, { useEffect, useState } from 'react';
import { FormLabel, FormControl, Input, Box, Text } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { search } from '../../store/actions/searchActions';

const SearchByName = () => {
  const [term, setTerm] = useState('');

  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.search);

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(search(term));
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [term, dispatch]);

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
      {items.map((r) => (
        <Box key={r.id} mt="5px">
          <Text as={Link} to={`/restaurants/${r.id}`}>
            {r.name}
          </Text>
        </Box>
      ))}
    </>
  );
};

export default SearchByName;
