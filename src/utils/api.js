import axios from 'axios';

// Function to create a new user
export const createUser = async (userData) => {
    try {
        const response = await axios.post('https://project-data-ogw5.onrender.com/users', userData);
        return response.data;
    } catch (error) {
        throw new Error('Failed to create user: ' + error.message);
    }
};

// Function to log in a user
export const loginUser = async ({ email, password }) => {
    try {
        const response = await axios.get('https://project-data-ogw5.onrender.com/users', {
            params: {
                email,
                password,
            },
        });

        const users = response.data;

        if (users.length === 0) {
            throw new Error('Invalid credentials');
        }

        return users[0]; // Return the first matched user
    } catch (error) {
        throw new Error('Login failed: ' + error.message);
    }
};

export const checkUserExists = async (email, username) => {
    try {
      const response = await axios.get('https://project-data-ogw5.onrender.com/users', {
        params: { email, username },
      });
  
      const users = response.data;
      return users.length > 0; // Return true if user already exists
    } catch (error) {
      throw new Error('Error checking if user exists: ' + error.message);
    }
  };