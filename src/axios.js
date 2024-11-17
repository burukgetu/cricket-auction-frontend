import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// Add the Authorization header to each request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // Replace 'token' with your key
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;