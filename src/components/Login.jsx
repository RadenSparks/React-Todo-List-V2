import React, { useState, useEffect } from 'react';
import { useUser } from './UserContext';
import {
  Button,
  Input,
  VStack,
  Heading,
  Box,
  Checkbox,
  FormControl,
  FormLabel,
  Text,
  useToast,
  IconButton,
  Fade,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const Login = () => {
  const { login, register } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) setUsername(savedUsername);
  }, []);

  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  }, [username, rememberMe]);

  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    return minLength && hasUppercase && hasLowercase && hasNumber;
  };

  const validateUsername = (username) => {
    const minLength = username.length >= 3;
    const maxLength = username.length <= 20;
    const validCharacters = /^[a-zA-Z0-9_]+$/.test(username);
    return minLength && maxLength && validCharacters;
  };

  const handleLogin = async () => {
    try {
      await login(username, password, rememberMe);
      toast({
        title: 'Login successful.',
        description: 'You are now logged in.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  const handleRegister = async () => {
    if (!validateUsername(username)) {
      setError('Username must be 3-20 characters long and can only contain letters, numbers, and underscores.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, and a number.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await register(username, password);
      setIsRegistering(false);
      setPassword('');
      setConfirmPassword('');
      toast({
        title: 'Registration successful.',
        description: 'Please log in with your new account.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <Box position="relative" height="100vh" width="100%" overflow="hidden">
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source src="https://motionbgs.com/media/4350/pixel-cityscape.960x540.mp4" type="video/mp4" />
      </video>
      <Fade in>
        <Box
          maxW="400px"
          mx="auto"
          mt="100px"
          p={6}
          borderWidth={1}
          borderRadius="md"
          boxShadow="lg"
          bg="white"
          opacity="0.9"
          transition="transform 0.3s ease-in-out, opacity 0.3s ease-in-out"
          _hover={{ transform: 'scale(1.02)', opacity: 1 }}
        >
          <Heading as="h2" size="lg" textAlign="center" mb={6} color="teal.500">
            {isRegistering ? 'Register' : 'Login'}
          </Heading>
          {error && <Text color="red.500" mb={4}>{error}</Text>}
          <VStack spacing={4}>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant="outline"
              focusBorderColor="teal.500"
              borderColor="teal.200"
              _hover={{ borderColor: 'teal.300' }}
              name="username"
              autoComplete="username"
              transition="border-color 0.2s"
            />
            <FormControl position="relative">
              <Input
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outline"
                focusBorderColor="teal.500"
                borderColor="teal.200"
                _hover={{ borderColor: 'teal.300' }}
                name="password"
                autoComplete="current-password"
                transition="border-color 0.2s"
              />
              <IconButton
                variant="link"
                onClick={() => setShowPassword(!showPassword)}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                position="absolute"
                right="1rem"
                top="50%"
                transform="translateY(-50%)"
                zIndex="1"
              />
            </FormControl>
            {isRegistering && (
              <FormControl position="relative">
                <Input
                  placeholder="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant="outline"
                  focusBorderColor="teal.500"
                  borderColor="teal.200"
                  _hover={{ borderColor: 'teal.300' }}
                  name="confirmPassword"
                  autoComplete="new-password"
                  transition="border-color 0.2s"
                />
                <IconButton
                  variant="link"
                  onClick={() => setShowPassword(!showPassword)}
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  position="absolute"
                  right="1rem"
                  top="50%"
                  transform="translateY(-50%)"
                  zIndex="1"
                />
              </FormControl>
            )}
            {!isRegistering && (
              <FormControl display="flex" alignItems="center">
                <Checkbox
                  isChecked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  colorScheme="teal"
                />
                <FormLabel mb="0" ml={2} color="black"> {/* Change color to black */}
                  Remember Me
                </FormLabel>
              </FormControl>
            )}
            <Button
              colorScheme="teal"
              onClick={isRegistering ? handleRegister : handleLogin}
              width="full"
              size="lg"
              _hover={{ bg: 'teal.600' }}
              transition="background-color 0.2s"
            >
              {isRegistering ? 'Register' : 'Login'}
            </Button>
            <Button
              variant="link"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError('');
              }}
            >
              {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
            </Button>
          </VStack>
        </Box>
      </Fade>
    </Box>
  );
};

export default Login;
