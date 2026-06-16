// Dans src/front/pages/admin/AddDestination.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleAlert, Save, X } from 'lucide-react'; // Même design iconographique
import AppSidebarLayout from '../../layouts/app/app-sidebar-layout'; // Même structure de mise en page
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea'; // Utilisation du composant Textarea comme dans create.tsx
import { AlertMessage } from '../../components/ui/alert-message';
import { apiFetch } from '../../lib/api'; // Appel direct sur ton apiFetch centralisé

export default function AddDestination() {
    const navigate = useNavigate();

    // États calqués sur ton schéma SQL (nomDestination, region, description, image)
    const [nomDestination, setNomDestination] = useState('');
    const [region, setRegion] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Respect strict des colonnes obligatoires (NOT NULL) de ta table SQL
            await apiFetch('/destination', {
                method: 'POST',
                body: JSON.stringify({
                    nomDestination,
                    region,
                    description,
                    image,
                }),
            });
            
            setSuccess('Destination créée avec succès !');
            // Redirection vers l'espace d'administration ou la liste des destinations après succès
            setTimeout(() => navigate('/dashboard'), 1200);
        } catch (err: unknown) {
            // Capture l'erreur et l'affiche dans ta boîte de dialogue rouge de l'IHM
            setError(err instanceof Error ? err.message : 'Erreur lors de la création');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Tableau de Bord', href: '/dashboard' },
                { title: 'Destinations', href: '/dashboard' },
                { title: 'Nouvelle destination', href: '/destinations/create' },
            ]}
        >
            <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
                {/* En-tête de la page identique à create.tsx */}
                <div className="mb-8">
                    <h2 className="text-3xl font-black">Créer une destination</h2>
                    <p className="text-muted-foreground mt-1">Remplissez les informations pour ajouter un nouveau lieu d'accueil</p>
                </div>

                {/* Gestion des alertes : s'affichera sous forme de boîte de dialogue rouge en cas d'erreur */}
                {error && <AlertMessage type="error" message={error} className="mb-6" />}
                {success && <AlertMessage type="success" message={success} className="mb-6" />}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Section unique "Informations de la destination" reprenant les boîtes blanches arrondies */}
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
                        <div className="flex items-center gap-3 border-b pb-4">
                            <CircleAlert className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-bold">Détails géographiques & visuels</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="nomDestination">Nom de la destination *</Label>
                                <Input
                                    id="nomDestination"
                                    value={nomDestination}
                                    required
                                    onChange={(e) => setNomDestination(e.target.value)}
                                    placeholder="Ex: Nosy Be, Allée des Baobabs..."
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="region">Région / Province *</Label>
                                <Input
                                    id="region"
                                    value={region}
                                    required
                                    onChange={(e) => setRegion(e.target.value)}
                                    placeholder="Ex: Diana, Menabe..."
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="image">Nom ou lien de l'image d'illustration *</Label>
                            <Input
                                id="image"
                                value={image}
                                type='file'
                                required
                                className='hover:file:bg-black hover:file:text-white hover:file:rounded-md hover:file:cursor-pointer file:transition-colors file:ease-in-out file:duration-300 file:border-0 file:rounded-md file:px-3 file:py-1 file:text-sm'
                                onChange={(e) => setImage(e.target.value)}
                                placeholder="Ex: nosy_be.jpg ou image.png"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description touristique *</Label>
                            <Textarea
                                id="description"
                                value={description}
                                required
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Décrivez l'atout touristique, le climat ou les paysages de cette destination..."
                                rows={4}
                            />
                        </div>
                    </div>

                    {/* Barre de boutons d'actions en bas à droite (Annuler / Créer) */}
                    <div className="flex gap-3 justify-end">
                        <Button type="button" variant="outline" onClick={() => navigate('/dashboard')} className="flex items-center gap-2">
                            <X className="h-4 w-4" />
                            Annuler
                        </Button>
                        <Button type="submit" disabled={loading} className="flex items-center gap-2">
                            <Save className="h-4 w-4" />
                            {loading ? 'Création...' : 'Créer la destination'}
                        </Button>
                    </div>
                </form>
            </main>
        </AppSidebarLayout>
    );
}