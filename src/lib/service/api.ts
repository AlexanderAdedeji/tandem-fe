import axios from 'axios';
// import useAuthStore from '../store/authStore';
import { toast } from 'sonner';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL,
});

// Attach token to each request (if available)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = "useAuthStore.getState().token";
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Global error handling for responses
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data &&
      typeof error.response.data.detail === 'string' &&
      error.response.data.detail.toLowerCase().includes('jwt expired')
    ) {
      // Clear auth and redirect to logout page if token expired
    //   useAuthStore.getState().setToken(null);
      toast.error('Session expired. Logging you out.');
      window.location.href = '/logout';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
