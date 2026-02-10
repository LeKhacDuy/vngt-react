'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { authService, User } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (token: string, userData: User) => void;
    logout: () => void;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initAuth = async () => {
            const token = Cookies.get('token');
            if (token) {
                try {
                    // Verify token or get profile
                    // For now, let's try to get profile directly
                    const profile = await authService.getProfile();
                    setUser(profile as any); // Type assertion might be needed depending on strictness
                } catch (error) {
                    console.error('Failed to restore session:', error);
                    Cookies.remove('token');
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, []);

    const login = (token: string, userData: User) => {
        Cookies.set('token', token, { expires: 7 }); // Expires in 7 days
        setUser(userData);
        router.push('/'); // Redirect to home or previous page
    };

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        router.push('/login');
    };

    const refreshProfile = async () => {
        try {
            const profile = await authService.getProfile();
            setUser(profile as any);
        } catch (error) {
            console.error('Failed to refresh profile:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
