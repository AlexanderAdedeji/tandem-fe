
import { toast } from 'sonner';
import axiosInstance from './api';

export const RequestMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH'
} as const;

export type RequestMethodType = typeof RequestMethod[keyof typeof RequestMethod];

async function request<T>(
  method: RequestMethodType,
  url: string,
  data: any = null,
  config: Record<string, any> = {}
): Promise<T> {
  try {
    const response = await axiosInstance.request<T>({
      method,
      url,
      data,
      ...config
    });
    return response.data;
  } catch (error: any) {
    // Optionally show a toast error here
    // toast.error(error?.response?.data?.detail || 'An unexpected error occurred');
    throw error;
  }
}

export default request;
