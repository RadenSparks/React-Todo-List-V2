const mockUsers = [];

export const registerUser = async (username, password) => {
  // Check if username already exists
  const userExists = mockUsers.find(user => user.username === username);
  if (userExists) {
    throw new Error('Username already exists');
  }

  // Simulate user registration
  const newUser = { username, password, name: username }; // Add 'name' property
  mockUsers.push(newUser); // Add the new user to the array

  return newUser;
};


export const authenticateUser = async (username, password) => {
    // Simulate user authentication
    const user = mockUsers.find(
      user => user.username === username && user.password === password
    );
    
    if (!user) {
      throw new Error('Invalid username or password');
    }
    
    return user;
  };
  