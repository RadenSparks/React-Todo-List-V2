import React from 'react';
import { Flex, Spinner, Text } from '@chakra-ui/react';

const LoadingScreen = () => (
  <Flex
    height="100vh"
    align="center"
    justify="center"
    direction="column"
    backgroundColor="gray.100"
  >
    <Spinner size="xl" color="teal.500" mb={4} />
    <Text fontSize="2xl" fontWeight="bold" color="teal.600">Now Loading...</Text>
  </Flex>
);

export default LoadingScreen;
