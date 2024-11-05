import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const userData = await authService.login(email, password);
      setUser(userData);
      toast.success('Successfully logged in!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to login');
      return false;
    }
  };

  const register = async (userData) => {
    try {
      const newUser = await authService.register(userData);
      setUser(newUser);
      toast.success('Successfully registered!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to register');
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    toast.success('Successfully logged out!');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);