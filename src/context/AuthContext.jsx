import React, { createContext, useState, useContext , useEffect, useCallback} from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));  // Save user data in local storage
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
  };


  const fetchBids = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://project-data-ogw5.onrender.com/bids");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setBids(data);
    } catch (error) {
      setError(error);
      console.error("Error fetching bids:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchBids();
    }
  }, [user, fetchBids]);

  return (
    <AuthContext.Provider value={{ user, login, signOut ,  bids, fetchBids, loading  }}>
      {children}
    </AuthContext.Provider>
  );
};
