// src/services/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5001/api', // Your API base URL
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Handle 500 errors
    if (error.response && error.response.status === 500) {
      console.error('Server Error:', error.response.data);
      alert('An unexpected error occurred. Please try again later.'); // Display a user-friendly message
    }
    return Promise.reject(error); // Reject the promise to handle it in the component
  }
);

export default axiosInstance;