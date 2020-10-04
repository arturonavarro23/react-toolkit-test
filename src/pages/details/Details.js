import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Image, Stack, Text, Flex } from '@chakra-ui/core';
import { useDispatch, useSelector } from 'react-redux';

import {
  getRestaurant,
  updateRestaurant,
} from '../../store/actions/restauantActions';
import Form from '../../components/form';
import Error from '../../components/error';

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { content, loading, updatingLoading, error } = useSelector(
    (state) => state.restaurant
  );

  useEffect(() => {
    dispatch(getRestaurant(id));
  }, [id, dispatch]);

  function onSubmit(values) {
    dispatch(
      updateRestaurant({
        ...content,
        ...values,
      })
    );
  }

  if (loading === 'pending') {
    return null;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <Heading>{content.name}</Heading>
      <Flex direction={{ xs: 'column', lg: 'row' }}>
        <Stack
          w={{ xs: '100%', lg: '500px' }}
          marginRight={{ xs: '0', lg: '20px' }}
        >
          <Box>
            <Image size="200px" src={content.img} alt={content.name} />
          </Box>
          <Box>
            <Text>Raiting: {content.raiting}</Text>
            <Text>Address: {content.address}</Text>
          </Box>
        </Stack>
        <Form
          onSubmit={onSubmit}
          isLoading={updatingLoading === 'pending'}
          defaultValues={content}
        />
      </Flex>
    </>
  );
};

export default Details;
