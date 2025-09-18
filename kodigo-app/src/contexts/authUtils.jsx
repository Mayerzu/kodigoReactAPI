// src/contexts/authUtils.jsx
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const authUtils = {
  initializeAuth: async (setUser, setLoading) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.userLogin);
      } catch {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  },

  login: async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      const userResponse = await axios.get(`${API_BASE_URL}/api/auth/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { success: true, user: userResponse.data.userLogin };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Error en login' };
    }
  },

  register: async (username, password) => {
    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, { username, password });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Error en registro' };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};