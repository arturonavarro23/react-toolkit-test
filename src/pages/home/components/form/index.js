import React, { useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/core';
import { useForm } from 'react-hook-form';

import useCreateRestaurant from '../../../../hooks/useCreateRestaurant';
import { resolver } from './validations';

const Form = () => {
  const {
    register,
    handleSubmit,
    errors,
    reset,
    formState: { touched },
  } = useForm({
    resolver,
    mode: 'all',
  });

  const [createRestaurant, { status }] = useCreateRestaurant();

  useEffect(() => {
    if (status === 'success') {
      reset({ number: null });
    }
  }, [status, reset]);

  const onSubmit = (values) => {
    createRestaurant(values);
  };

  return (
    <Box
      width={{ sm: '100%', md: '70%', lg: '50%' }}
      m={{ sm: '0 20px', lg: 0 }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name?.message && touched.name}>
          <FormLabel>Name</FormLabel>
          <Input name="name" type="text" ref={register} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl
          mt={6}
          isInvalid={errors.imageUrl?.message && touched.imageUrl}
        >
          <FormLabel>Image Url</FormLabel>
          <Input name="img" type="text" ref={register} />
          <FormErrorMessage>{errors.imageUrl?.message}</FormErrorMessage>
        </FormControl>
        <FormControl
          mt={6}
          isInvalid={errors.address?.message && touched.address}
        >
          <FormLabel>Address</FormLabel>
          <Input name="address" type="text" ref={register} />
          <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
        </FormControl>
        <FormControl
          mt={6}
          isInvalid={errors.raiting?.message && touched.raiting}
        >
          <FormLabel>Raiting</FormLabel>
          <NumberInput isInvalid={errors.raiting?.message && touched.raiting}>
            <NumberInputField name="raiting" type="number" ref={register} />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>{errors.raiting?.message}</FormErrorMessage>
        </FormControl>
        <Button
          width="full"
          mt={4}
          type="submit"
          isDisabled={status === 'loading'}
        >
          Add a Restaurant
        </Button>
      </form>
    </Box>
  );
};

export default Form;
