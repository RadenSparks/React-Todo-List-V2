import React, { createContext, useContext, useState } from 'react';
import { authenticateUser, registerUser } from './authService';

const UserContext = createContext({
  user: null,
  login: async (username, password, rememberMe) => {},
  register: async (username, password) => {},
  logout: () => {}
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password, rememberMe) => {
    try {
      const user = await authenticateUser(username, password);
      if (user && user.name) {
        setUser(user); // Ensure user has a 'name' property
      } else {
        throw new Error("User data does not contain a 'name' property.");
      }
      if (rememberMe) {
        localStorage.setItem('username', username);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (username, password) => {
    try {
      const newUser = await registerUser(username, password);
      if (newUser && newUser.name) {
        // Do not set the user state here. 
        // The user should manually log in after registration.
        return newUser; // Return the new user for further actions if needed
      } else {
        throw new Error("Registration data does not contain a 'name' property.");
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('username');
  };

  return (
    <UserContext.Provider value={{ user, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
