// Dans src/front/components/header-home.tsx
import { Link, useNavigate } from "react-router-dom";
import { Input } from "./ui/input";
import { Search } from 'lucide-react';
import AppLogo from "./app-logo";
import { logout } from "../lib/api"; // Importation de la fonction de déconnexion

export function Header() {
    const navigate = useNavigate();
    const token = localStorage.getItem('auth_token'); // Lecture du token

    const handleLogout = async () => {
        try {
            await logout(); // Appel à l'API
            navigate('/Login');
        } catch (err) {
            console.error("Erreur lors de la déconnexion", err);
            // Sécurité en cas de session expirée côté serveur
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            navigate('/Login');
        }
    };

    return (
        <>
            <div className="flex flex-3 sticky top-0 z-50 mt-5 w-full border-b border-border-color bg-surface-light/80 backdrop-blur-md px-4 md:px-8 h-[50px]">
                <div className="flex-1">
                    <Link to="/" className="flex items-center">
                        <AppLogo />
                    </Link>
                </div>
                <div className="flex-2 space-x-8 pl-50">
                    <Link to="/" className="hover:text-red-500 transition-colors ease-in-out duration-300">Explorer</Link>
                    <Link to="/" className="hover:text-red-500 transition-colors ease-in-out duration-300">Mes Voyages</Link>
                    <Link to="/" className="hover:text-red-500 transition-colors ease-in-out duration-300">Favoris</Link>
                    <Link to="/" className="hover:text-red-500 transition-colors ease-in-out duration-300">Support</Link>
                </div>
                
                <div className="justify-end space-x-2 flex items-center">
                    {token ? (
                        <>
                            {/* Actions si l'utilisateur est connecté */}
                            <Link to="/voyages/create" className="p-3 bg-primary text-white rounded-xl hover:bg-primary/90 text-sm font-medium transition-colors">
                                Créer offre personnalisée
                            </Link>
                            <button onClick={handleLogout} className="p-3 border-2 border-destructive text-destructive rounded-xl hover:bg-destructive/10 text-sm font-medium transition-colors cursor-pointer">
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Actions si l'utilisateur est déconnecté */}
                            <Link to="/Login" className="p-3 border-2 rounded-xl hover:text-red-500 text-sm font-medium">Connexion</Link>
                            <Link to="/Register" className="p-3 border-2 rounded-xl hover:text-red-500 text-sm font-medium">S'inscrire</Link>
                        </>
                    )}
                </div>
            </div>

            <div className="sticky top-0 z-50 w-full border-b border-border-color bg-surface-light/80 backdrop-blur-md px-4 md:px-8 h-[150px]">
                <div className="flex flex-col h-[80px] items-center justify-center space-y-2">
                    <h3 className="font-semibold">Où Souhaitez-vous voyager ?</h3>
                    <h4>découvrez nos meilleures offres de voyages personnalisés</h4>
                </div>
                <div className="flex flex-col -my-4 h-[70px] items-center justify-center space-y-3">
                    <div className="flex space-x-1">
                        <Input className="bg-white w-[500px]" />
                        <input className="bg-white shadow-lg rounded-md -mt-1 p-5 h-9 w-[152px] border border-input" type="date" />
                        <button className="flex bg-white shadow-lg rounded-md p-1 h-9 w-11 justify-center items-center hover:cursor-pointer hover:border">
                            <Search className="text-black h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}