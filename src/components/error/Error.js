import React from 'react';
import { Alert, AlertIcon, AlertTitle } from '@chakra-ui/core';

const Error = () => (
  <Alert
    status="error"
    w={{ sm: '100%', lg: '30%' }}
    mt="1.5em"
    variant="left-accent"
  >
    <AlertIcon />
    <AlertTitle mr={2}>Error</AlertTitle>
  </Alert>
);

export default Error;
