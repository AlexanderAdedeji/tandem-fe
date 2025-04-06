import { LoginSchemaInterface, SignUpSchemaInterface } from '@/app/auth/types';
import { apiClient } from '../client';
import { ApiResponse, AuthResponse } from '../types';
import useStore from '@/store';

export const authService = {
  async login(credentials: LoginSchemaInterface): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    if (response.data.data.token) {
      // Split the name into first and last name
      const nameParts = response.data.data.user.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      useStore.getState().setAuthDetails({
        email: response.data.data.user.email,
        first_name: firstName,
        last_name: lastName,
        token: response.data.data.token
      });
      useStore.getState().setLoggedIn(true);
    }
    return response.data;
  },

  async register(data: SignUpSchemaInterface): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data);
    if (response.data.data.token) {
      // Split the name into first and last name
      const nameParts = response.data.data.user.name.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      useStore.getState().setAuthDetails({
        email: response.data.data.user.email,
        first_name: firstName,
        last_name: lastName,
        token: response.data.data.token
      });
      useStore.getState().setLoggedIn(true);
    }
    return response.data;
  },

  async logout(): Promise<void> {
    useStore.getState().setAuthDetails({
      email: '',
      first_name: '',
      last_name: '',
      token: ''
    });
    useStore.getState().setLoggedIn(false);
  },

  async getCurrentUser(): Promise<ApiResponse<AuthResponse['user']>> {
    const response = await apiClient.get<ApiResponse<AuthResponse['user']>>('/auth/me');
    return response.data;
  },

  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    const response = await apiClient.post<ApiResponse<{ token: string }>>('/auth/refresh');
    if (response.data.data.token) {
      const currentAuth = useStore.getState().authDetails;
      if (currentAuth) {
        useStore.getState().setPartialAuthDetails({ token: response.data.data.token });
      }
    }
    return response.data;
  },
}; 