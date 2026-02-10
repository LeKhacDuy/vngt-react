import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

// Define the base URL from environment variables
// If on server, use absolute URL to avoid "Invalid URL" error with relative paths
// If on client, use the proxy path defined in next.config.ts or env
const isServer = typeof window === 'undefined';
const BASE_URL = isServer
    ? 'https://lekhacduy.io.vn/api'
    : (process.env.NEXT_PUBLIC_API_URL || 'https://lekhacduy.io.vn/api');

// Create an axios instance
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 15000,
});

// Request Interceptor
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Get token from cookies
        const token = Cookies.get('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data; // Return only the data part for convenience
    },
    (error: AxiosError) => {
        if (error.response) {
            // Handle 401 Unauthorized
            if (error.response.status === 401) {
                // Clear token and redirect to login if needed
                Cookies.remove('token');
                // You might want to trigger a redirect here or dispatched an event
                // window.location.href = '/login'; 
            }
        }
        return Promise.reject(error);
    }
);

export default api;
