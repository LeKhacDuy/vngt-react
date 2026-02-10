import api from './api';

export interface LoginResponse {
    access_token: string;
    user: User;
}

export interface User {
    id: string | number;
    username: string;
    email: string;
    role: string;
    is_admin?: boolean;
}

export const authService = {
    login: async (credentials: { username: string; password: string }) => {
        return api.post<any, LoginResponse>('/auth/login', credentials);
    },

    register: async (data: { username: string; email: string; password: string }) => {
        return api.post('/auth/register', data);
    },

    getProfile: async () => {
        return api.get<any, User>('/user/profile');
    },

    verifyToken: async () => {
        return api.get('/auth/verify-token');
    }
};
