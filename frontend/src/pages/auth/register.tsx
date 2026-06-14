import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import PasswordInput from '../../components/password-input';
import AppLogoIcon from '../../components/app-logo-icon';
import { useAuth } from '../../contexts/auth-context';
import { Header } from '../../components/header-home';

export default function Register() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== passwordConfirm) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        setLoading(true);
        // Simulation inscription front-only
        setTimeout(() => {
            login({
                id: 1,
                name,
                email,
                email_verified_at: new Date().toISOString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            });
            navigate('/dashboard');
            setLoading(false);
        }, 500);
    };

    return (
        <><Header /><div className=" flex items-center justify-center bg-background">
            <div className="w-full max-w-sm">
                <div className="flex flex-col items-center gap-4 p-5">
                    <Link to="/" className="flex flex-col items-center gap-2 font-medium">
                        <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
                            <AppLogoIcon className="size-9 fill-current text-[var(--foreground)] dark:text-white" />
                        </div>
                    </Link>
                    <div className="space-y-2 text-center">
                        <h1 className="text-xl font-medium">Créer un compte</h1>
                        <p className="text-center text-sm text-muted-foreground">
                            Entrez vos informations pour créer votre compte
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 px-5">
                    {error && (
                        <p className="text-sm text-destructive text-center">{error}</p>
                    )}
                    <div className="grid gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nom complet</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                autoComplete="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Jean Dupont" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Adresse email</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="email@exemple.com" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password">Mot de passe</Label>
                            <PasswordInput
                                id="password"
                                required
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Mot de passe" />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirmer le mot de passe</Label>
                            <PasswordInput
                                id="password_confirmation"
                                required
                                autoComplete="new-password"
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                placeholder="Confirmer le mot de passe" />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Création...' : "S'inscrire"}
                        </Button>
                    </div>

                    <p className="text-center text-sm text-muted-foreground">
                        Déjà un compte ?{' '}
                        <Link to="/login" className="text-primary underline underline-offset-4">
                            Se connecter
                        </Link>
                    </p>
                </form>
            </div>
        </div></>
    );
}
