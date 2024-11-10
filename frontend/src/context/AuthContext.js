// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to fetch user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    console.log('Tentative de connexion avec:', email, password);
    try {
        const userData = await authService.login(email, password);
        console.log('Utilisateur connecté:', userData); // Ajoutez ce log
        if (userData) {
            setUser (userData);
            navigate('/news'); // Redirection après une connexion réussie
            toast.success('Connexion réussie !');
        } else {
            throw new Error('Utilisateur non trouvé');
        }
    } catch (error) {
        console.error('Erreur de connexion:', error);
        toast.error(error.response?.data?.message || 'Erreur de connexion');
        throw error;
    }

};

  const register = async (formData) => {
    try {
      const userData = await authService.register(formData);
      setUser(userData);
      navigate('/news'); // Redirection après une inscription réussie
      toast.success('Inscription réussie !');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur d\'inscription');
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
    toast.success('Déconnexion réussie !');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);