import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const newsService = {
  async getAllNews() {
    const response = await axios.get(`${API_URL}/news`);
    return response.data;
  },

  async addNews(newsData) {
    const response = await axios.post(`${API_URL}/news`, newsData, {
      headers: getAuthHeader()
    });
    return response.data;
  },

  async likeNews(newsId) {
    const response = await axios.post(
      `${API_URL}/news/${newsId}/like`,
      {},
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  async dislikeNews(newsId) {
    const response = await axios.post(
      `${API_URL}/news/${newsId}/dislike`,
      {},
      { headers: getAuthHeader() }
    );
    return response.data;
  },

  async addComment(newsId, text) {
    const response = await axios.post(
      `${API_URL}/news/${newsId}/comment`,
      { text },
      { headers: getAuthHeader() }
    );
    return response.data;
  }
};

export default newsService;