// App.js
import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { UserProvider, useUser } from './components/UserContext';
import AppContent from './components/AppContent'; // Your existing app content
import Login from './components/Login';

// Your existing theme configuration
const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        color: 'gray.800',
      },
    },
  },
  components: {
    Checkbox: {
      baseStyle: {
        control: {
          _checked: {
            bg: 'teal.500',
            borderColor: 'teal.500',
            color: 'white',
          },
          _hover: {
            borderColor: 'teal.600',
          },
          _focus: {
            boxShadow: '0 0 0 2px rgba(0, 255, 255, 0.5)',
          },
        },
        label: {
          fontWeight: 'bold',
          fontSize: 'lg',
        },
      },
    },
  },
});

function App() {
  return (
    <UserProvider>
      <ChakraProvider theme={theme}>
        <Main />
      </ChakraProvider>
    </UserProvider>
  );
}

const Main = () => {
  const { user } = useUser();

  return user ? <AppContent /> : <Login />;
};

export default App;
