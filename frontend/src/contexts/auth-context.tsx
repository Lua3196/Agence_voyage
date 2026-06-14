/**
 * AuthContext — contexte auth pour mode front-only (sans Laravel)
 *
 * En phase de test frontend, un utilisateur fictif est utilisé.
 * Quand tu connectes Laravel, remplace le fakeUser et les fonctions
 * login/logout par de vrais appels API.
 */

import React, { createContext, useContext, useState } from 'react';
import type { User } from '../types';

type AuthContextType = {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

// Utilisateur fictif pour le mode front-only
const fakeUser: User = {
    id: 1,
    name: 'Jean Dupont',
    email: 'jean.dupont@example.com',
    avatar: undefined,
    email_verified_at: new Date().toISOString(),
    two_factor_enabled: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
    // Démarre avec l'utilisateur fictif connecté pour tester le dashboard
    // Mets `null` ici pour forcer la redirection vers /login au démarrage
    //const [user, setUser] = useState<User | null>(fakeUser);
    const [user, setUser] = useState<User | null>(null);// COMMENTEO ITO DE DECOMMENTEO NY AMBANY RAHA HITEST DASHBOARD ETC

    const login = (u: User) => setUser(u);
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
}
