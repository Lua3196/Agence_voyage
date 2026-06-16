import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Checkbox } from '../../components/ui/checkbox';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import PasswordInput from '../../components/password-input';
import AppLogoIcon from '../../components/app-logo-icon';
import { useAuth } from '../../contexts/auth-context';
import { Header } from '../../components/header-home1';
import { AlertMessage } from '../../components/ui/alert-message';
import { loginAdmin, loginClient } from '../../lib/api';

type Mode = 'admin' | 'client';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [mode, setMode] = useState<Mode>('client');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = mode === 'admin'
                ? await loginAdmin(email, password)
                : await loginClient(email, password);

            login(
                {
                    id: res.user.id,
                    name: res.user.name,
                    email: res.user.email,
                    email_verified_at: null,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    role: res.role,
                },
                res.token,
                res.role,
            );

            navigate(res.role === 'admin' ? '/dashboard' : '/index');
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Header />
            <div className="flex items-center justify-center bg-background py-12">
                <div className="w-full max-w-sm">
                    <div className="flex flex-col items-center gap-4 p-5">
                        <Link to="/" className="flex flex-col items-center gap-2 font-medium">
                            <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                                <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
                            </div>
                        </Link>
                        <div className="space-y-2 text-center">
                            <h1 className="text-xl font-medium">Connexion</h1>
                            <p className="text-center text-sm text-muted-foreground">
                                Entrez vos identifiants pour accéder à votre compte
                            </p>
                        </div>
                    </div>

                    {/* Sélecteur admin / client */}
                    <div className="flex rounded-lg border border-border overflow-hidden mb-6 mx-5">
                        <button
                            type="button"
                            onClick={() => setMode('client')}
                            className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === 'client' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted'}`}
                        >
                            Client
                        </button>
                        <button
                            type="button"
                            onClick={() => setMode('admin')}
                            className={`flex-1 py-2 text-sm font-medium transition-colors ${mode === 'admin' ? 'bg-primary text-white' : 'text-muted-foreground hover:bg-muted'}`}
                        >
                            Administrateur
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-5">
                        {error && <AlertMessage type="error" message={error} />}

                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Adresse email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    autoFocus
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="email@exemple.com"
                                />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password">Mot de passe</Label>
                                </div>
                                <PasswordInput
                                    id="password"
                                    required
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Mot de passe"
                                />
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="remember"
                                    checked={remember}
                                    onCheckedChange={(v) => setRemember(!!v)}
                                />
                                <Label htmlFor="remember" className="cursor-pointer font-normal">
                                    Se souvenir de moi
                                </Label>
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Connexion...' : 'Se connecter'}
                            </Button>
                        </div>

                        <p className="text-center text-sm text-muted-foreground">
                            Pas encore de compte ?{' '}
                            <Link to="/register" className="text-primary underline underline-offset-4">
                                S'inscrire
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}
