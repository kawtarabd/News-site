// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const authService = {
  // src/services/authService.js
  async login(email, password) {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        return response.data.user; // Assurez-vous que cela renvoie bien l'utilisateur
    } catch (error) {
        console.error('Erreur lors de la connexion:', error.response ? error.response.data : error.message);
        throw error.response ? error.response.data : new Error('Erreur de connexion');
    }
},
async register(formData) {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, formData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        return response.data;
    } catch (error) {
        throw error;
    }
},

async getCurrentUser () {
    const token = localStorage.getItem('token');
    if (!token) return null;

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const response = await axios.get(`${API_URL}/auth/me`);
    return response.data;
},

logout() {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
},

  // Nouvelle méthode pour rechercher des utilisateurs
  async searchUsers(query) {
    try {
      const response = await axios.get(`${API_URL}/users/search`, {
        params: { query }
      });
      return response.data; // Liste des utilisateurs trouvés
    } catch (error) {
      throw error;
    }
  },

  // Nouvelle méthode pour ajouter un ami
  async addFriend(friendId) {
    try {
      const response = await axios.post(`${API_URL}/users/friends/${friendId}`);
      return response.data; // Confirmation de l'ajout d'ami
    } catch (error) {
      throw error;
    }
  },

  // Nouvelle méthode pour supprimer un ami
  async removeFriend(friendId) {
    try {
      const response = await axios.delete(`${API_URL}/users/friends/${friendId}`);
      return response.data; // Confirmation de la suppression d'ami
    } catch (error) {
      throw error;
    }
  }
};

export default authService;
