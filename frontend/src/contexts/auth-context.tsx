import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';

export type AuthRole = 'admin' | 'client' | null;

type AuthContextType = {
    user: User | null;
    role: AuthRole;
    token: string | null;
    login: (user: User, token: string, role: AuthRole) => void;
    logout: () => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(() => {
        const stored = localStorage.getItem('auth_user');
        return stored ? JSON.parse(stored) : null;
    });
    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem('auth_token')
    );
    const [role, setRole] = useState<AuthRole>(() =>
        (localStorage.getItem('auth_role') as AuthRole) || null
    );

    const login = (u: User, t: string, r: AuthRole) => {
        setUser(u);
        setToken(t);
        setRole(r);
        localStorage.setItem('auth_user', JSON.stringify(u));
        localStorage.setItem('auth_token', t);
        localStorage.setItem('auth_role', r || '');
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setRole(null);
        localStorage.removeItem('auth_user');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_role');
    };

    return (
        <AuthContext.Provider value={{ user, token, role, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}
