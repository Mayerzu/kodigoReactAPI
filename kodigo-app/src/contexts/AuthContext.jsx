// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authUtils } from './authUtils';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica que setUser y setLoading estén definidos antes de llamar a initializeAuth
    if (setUser && setLoading) {
      authUtils.initializeAuth(setUser, setLoading).catch((error) => {
        console.error('Error initializing auth:', error);
        setLoading(false); // Asegura que loading se desactive en caso de error
      });
    }
  }, [setUser, setLoading]); // Dependencias vacías o con setUser/setLoading para que se ejecute una vez

  const login = async (username, password) => {
    const result = await authUtils.login(username, password);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  const register = async (username, password) => {
    const result = await authUtils.register(username, password);
    return result;
  };

  const logout = () => {
    authUtils.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Elimina AuthInitializer ya que la inicialización se maneja en AuthProvider
// export const AuthInitializer = ({ children }) => { ... }; (comentado o eliminado)