// Service API — toutes les requêtes vers le backend Laravel
const BASE_URL = 'http://localhost:8000/api';

function getToken(): string | null {
    return localStorage.getItem('auth_token');
}

export async function apiFetch<T>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const token = getToken();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        Accept: 'application/json', // Force Laravel à répondre en JSON (évite les redirections bizarres)
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers as Record<string, string> || {}),
    };

    const res = await fetch(`${BASE_URL}${path}`, { ...options, headers });

    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: 'Erreur serveur' }));
        throw new Error(err.message || `Erreur ${res.status}`);
    }

    return res.json();
}

// ── Auth ────────────────────────────────────────────────────────────────────

export interface AuthResponse {
    message: string;
    role: 'admin' | 'client';
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: 'admin' | 'client';
    };
}

export async function loginAdmin(email: string, mdp: string): Promise<AuthResponse> {
    return apiFetch('/login/admin', {
        method: 'POST',
        body: JSON.stringify({ email, mdp }),
    });
}

export async function loginClient(email: string, mdp: string): Promise<AuthResponse> {
    return apiFetch('/login/client', {
        method: 'POST',
        body: JSON.stringify({ email, mdp }),
    });
}

export async function registerClient(data: {
    nom: string;
    prenom: string;
    email: string;
    numTel: number;
    mdp: string;              // Changé mdp -> password
    mdp_confirmation: string; // Changé mdp_confirmation -> password_confirmation
}): Promise<AuthResponse> {
    return apiFetch('/register', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

export async function logout(): Promise<void> {
    await apiFetch('/logout', { method: 'POST' });
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
}

// ── Voyages ──────────────────────────────────────────────────────────────────

export interface Voyage {
    idVoyage: number;
    titre: string;
    description: string;
    dateDepart: string;
    dataRetour: string;
    prix: number;
    placeDispo: number;
    idDestination: number;
    destination?: {
        idDestination: number;
        nomDestination: string;
    };
}

export interface VoyagesResponse {
    data: Voyage[];
}

export async function getVoyages(): Promise<VoyagesResponse> {
    return apiFetch('/voyage');
}

export async function getVoyage(id: number): Promise<{ data: Voyage }> {
    return apiFetch(`/voyage/${id}`);
}

export async function createVoyage(data: Omit<Voyage, 'idVoyage' | 'destination'>): Promise<{ message: string; data: Voyage }> {
    return apiFetch('/voyage', {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

// ── Destinations ─────────────────────────────────────────────────────────────

export interface Destination {
    idDestination: number;
    nomDestination: string;
    region: string;
    description: string;
    image?: string;
}

export interface DestinationsResponse {
    data: Destination[];
}

export async function getDestinations(): Promise<DestinationsResponse> {
    return apiFetch('/destination');
}

// ── Clients ───────────────────────────────────────────────────────────────────

export interface Client {
    idClient: number;
    nom: string;
    prenom: string;
    email: string;
    numTel: number;
    created_at: string;
}

export interface ClientsResponse {
    data: Client[];
}

export async function getClients(): Promise<ClientsResponse> {
    return apiFetch('/clients');
}