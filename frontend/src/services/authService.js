import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const authService = {
  async register(userData) {
      try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  

  async login(email, password) {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
  },

  async getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      this.logout();
      return null;
    }
  }
};

export default authService;