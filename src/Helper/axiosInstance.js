import axios from "axios";

// If VITE_API_BASE_URL is provided (e.g., production), use it.
// Otherwise default to "/api" so Vite dev server proxy can forward to backend.
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for better error handling
axiosInstance.interceptors.request.use(
  (config) => {
    // Log requests in development
    if (import.meta.env.DEV) {
      console.log('API Request:', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 0 || error.code === 'NETWORK_ERROR') {
      console.error('Network error - CORS or server unavailable:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
