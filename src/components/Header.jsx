import React from 'react';
import { Flex, Heading, Switch, useColorMode, useColorModeValue, Text } from '@chakra-ui/react';

const Header = ({ userName }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  return (
    <Flex
      as="header"
      p={4}
      bg={bg}
      color={color}
      alignItems="center"
      justifyContent="space-between"
      boxShadow="md"
    >
      <Heading as="h1" size="lg">
        {userName}'s To-Do App
      </Heading>
      <Flex alignItems="center">
        <Text mr={2}>Dark Mode</Text>
        <Switch isChecked={colorMode === 'dark'} onChange={toggleColorMode} />
      </Flex>
    </Flex>
  );
};

export default Header;
