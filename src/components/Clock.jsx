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
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <Box
      p={6}
      bg={`linear-gradient(to right, ${colors.teal[500]}, ${colors.teal[300]})`}
      color="black"
      borderRadius="md"
      boxShadow="lg"
      textAlign="center"
      fontSize={{ base: "md", md: "lg" }}
      border="1px solid"
      borderColor={colors.teal[600]}
    >
      <VStack spacing={4}>
        <Text fontWeight="bold" fontSize="xl">
          Current Date & Time
        </Text>
        <Text fontSize="2xl" fontWeight="semibold">{formatDate(currentDate)}</Text>
        <Text fontSize="3xl" fontWeight="bold">{formatTime(currentDate)}</Text>
      </VStack>
    </Box>
  );
};

export default Clock;
