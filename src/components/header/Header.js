import React from 'react';
import { Flex, Heading } from '@chakra-ui/core';

const Header = () => {
  return (
    <Flex
      as="nav"
      wrap="wrap"
      padding="1.5rem"
      align="center"
      bg="cyan.700"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={'-.1rem'}>
          React Query Test
        </Heading>
      </Flex>
    </Flex>
  );
};

export default Header;
