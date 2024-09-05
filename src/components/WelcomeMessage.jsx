import React from 'react';
import { Flex, Text, Tooltip, Button } from '@chakra-ui/react';

const WelcomeMessage = ({ user, logout }) => (
  <Flex justify="space-between" align="center" p={4} bg="teal.500">
    <Text fontSize="lg" color="white" noOfLines={1} fontWeight="bold" textShadow="1px 1px 2px rgba(0, 0, 0, 0.7)">
      Welcome back, {user ? user.name : 'Guest'}!
    </Text>
    <Tooltip label="Logout" aria-label="Logout tooltip">
      <Button
        colorScheme="red"
        size="sm"
        variant="solid"
        onClick={logout}
        _hover={{ bg: 'red.600', transform: 'scale(1.05)' }}
        _active={{ bg: 'red.700', transform: 'scale(0.95)' }}
        borderRadius="md"
      >
        Logout
      </Button>
    </Tooltip>
  </Flex>
);

export default WelcomeMessage;
