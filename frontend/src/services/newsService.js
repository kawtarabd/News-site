import axiosInstance from './axiosInstance';
const API_URL = '/news'; // axiosInstance gère la baseURL

// Fonction pour obtenir la configuration d'autorisation
const getAuthConfig = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
};

const newsService = {
    async getAllNews() {
        try {
            const response = await axiosInstance.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Error fetching news:', error);
            throw error;
        }
    },

    async addNews(newsData) {
        try {
            const response = await axiosInstance.post(API_URL, newsData, getAuthConfig());
            return response.data;
        } catch (error) {
            console.error('Error adding news:', error);
            throw error;
        }
    },

    async updateNews(id, newsData) {
        try {
            const response = await axiosInstance.put(`${API_URL}/${id}`, newsData, getAuthConfig());
            return response.data;
        } catch (error) {
            console.error('Error updating news:', error);
            throw error;
        }
    },

    async deleteNews(id) {
        try {
            const response = await axiosInstance.delete(`${API_URL}/${id}`, getAuthConfig());
            return response.data;
        } catch (error) {
            console.error('Error deleting news:', error);
            throw error;
        }
    },

    async likeNews(id) {
        try {
            const response = await axiosInstance.put(`${API_URL}/${id}/like`, {}, getAuthConfig());
            return response.data;
        } catch (error) {
            console.error('Error liking news:', error);
            throw error;
        }
    },

    async dislikeNews(id) {
        try {
            const response = await axiosInstance.put(`${API_URL}/${id}/dislike`, {}, getAuthConfig());
            return response.data;
        } catch (error) {
            console.error('Error disliking news:', error);
            throw error;
        }
    },

    async getCommentsForNews(newsId) {
        try {
            const response = await axiosInstance.get(`${API_URL}/${newsId}/comments`);
            return response.data;
        } catch (error) {
            console.error('Error fetching comments:', error);
            throw error;
        }
    },

    async addComment(newsId, commentData) {
        try {
            const response = await axiosInstance.post(`${API_URL}/comment/${newsId}`, commentData, getAuthConfig());
            return response.data;
        } catch (error) {
            console.error('Error adding comment:', error);
            throw error;
        }
    }
};

export default newsService;
