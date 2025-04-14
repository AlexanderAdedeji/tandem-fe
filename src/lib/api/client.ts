import axios from 'axios';
import useStore from '@/store';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  (config) => {
    const token = useStore.getState().authDetails.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        const response = await apiClient.post('/auth/refresh');
        if (response.data.data.token) {
          const currentAuth = useStore.getState().authDetails;
          if (currentAuth) {
            useStore.getState().setPartialAuthDetails({ token: response.data.data.token });
          }
          // Retry the original request
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, clear auth and redirect to login
        useStore.getState().setAuthDetails({
          email: '',
          first_name: '',
          last_name: '',
          token: ''
        });
        useStore.getState().setLoggedIn(false);
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  }
); 