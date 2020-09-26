import React, { useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
} from '@chakra-ui/core';
import { useForm } from 'react-hook-form';

import { resolver } from './validations';

const Form = ({ onSubmit, isLoading, clearValues, defaultValues = {} }) => {
  const {
    register,
    handleSubmit,
    errors,
    reset,
    formState: { touched },
  } = useForm({
    resolver,
    mode: 'all',
    defaultValues,
  });

  useEffect(() => {
    if (clearValues) {
      reset();
    }
  }, [clearValues, reset]);

  const onSubmitForm = (values) => {
    onSubmit(values);
  };

  return (
    <Box
      width={{ sm: '100%', md: '70%', lg: '50%' }}
      m={{ sm: '0 20px', lg: 0 }}
    >
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <FormControl isInvalid={errors.name?.message && touched.name}>
          <FormLabel>Name</FormLabel>
          <Input name="name" type="text" ref={register} />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>
        <FormControl mt={6} isInvalid={errors.img?.message && touched.img}>
          <FormLabel>Image Url</FormLabel>
          <Input name="img" type="text" ref={register} />
          <FormErrorMessage>{errors.img?.message}</FormErrorMessage>
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
          <Input name="raiting" type="text" ref={register} />
          <FormErrorMessage>{errors.raiting?.message}</FormErrorMessage>
        </FormControl>
        <Button
          width={{ xs: 'full', lg: '200px' }}
          mt={4}
          type="submit"
          isDisabled={isLoading}
        >
          Add a Restaurant
        </Button>
      </form>
    </Box>
  );
};

export default Form;
