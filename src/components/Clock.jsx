// src/components/Clock.jsx
import React, { useState, useEffect } from 'react';
import { Box, Text, useTheme, VStack } from '@chakra-ui/react';

const Clock = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { colors } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    // Format date in a user-friendly manner
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const formatTime = (date) => {
    // Format time in a user-friendly manner
    return date.toLocaleTimeString();
  };

  return (
    <Box
      p={4}
      bg={colors.teal[600]}
      color="white"
      borderRadius="md"
      boxShadow="md"
      textAlign="center"
      fontSize={{ base: "md", md: "lg" }}
    >
      <VStack spacing={2}>
        <Text fontWeight="bold" fontSize="lg">
          Current Date & Time
        </Text>
        <Text fontSize="xl">{formatDate(currentDate)}</Text>
        <Text fontSize="2xl">{formatTime(currentDate)}</Text>
      </VStack>
    </Box>
  );
};

export default Clock;
