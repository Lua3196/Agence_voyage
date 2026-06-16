import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleAlert, Save, X } from 'lucide-react';
import AppSidebarLayout from '../../layouts/app/app-sidebar-layout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { AlertMessage } from '../../components/ui/alert-message';
import { createVoyage, getDestinations, type Destination } from '../../lib/api';

export default function VoyagesCreate() {
    const navigate = useNavigate();

    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [loadingDest, setLoadingDest] = useState(true);

    const [titre, setTitre] = useState('');
    const [description, setDescription] = useState('');
    const [idDestination, setIdDestination] = useState('');
    const [dateDepart, setDateDepart] = useState('');
    const [dataRetour, setDataRetour] = useState('');
    const [prix, setPrix] = useState('');
    const [placeDispo, setPlaceDispo] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        getDestinations()
            .then((r) => setDestinations(r.data))
            .catch(() => {})
            .finally(() => setLoadingDest(false));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            await createVoyage({
                titre,
                description,
                idDestination: parseInt(idDestination),
                dateDepart,
                dataRetour,
                prix: parseFloat(prix),
                placeDispo: parseInt(placeDispo),
            });
            setSuccess('Voyage créé avec succès !');
            setTimeout(() => navigate('/voyages'), 1200);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Erreur lors de la création');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Tableau de Bord', href: '/dashboard' },
                { title: 'Voyages', href: '/voyages' },
                { title: 'Nouveau voyage', href: '/voyages/create' },
            ]}
        >
            <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
                <div className="mb-8">
                    <h2 className="text-3xl font-black">Créer un voyage</h2>
                    <p className="text-muted-foreground mt-1">Remplissez les informations pour ajouter un nouveau voyage</p>
                </div>

                {error && <AlertMessage type="error" message={error} className="mb-6" />}
                {success && <AlertMessage type="success" message={success} className="mb-6" />}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
                        <div className="flex items-center gap-3 border-b pb-4">
                            <CircleAlert className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-bold">Informations générales</h3>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="titre">Titre du voyage *</Label>
                            <Input
                                id="titre"
                                value={titre}
                                required
                                onChange={(e) => setTitre(e.target.value)}
                                placeholder="Ex: Circuit des Merveilles Asiatiques"
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                value={description}
                                required
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Décrivez ce voyage en détail..."
                                rows={4}
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="destination">Destination *</Label>
                            <select
                                id="destination"
                                required
                                value={idDestination}
                                onChange={(e) => setIdDestination(e.target.value)}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                            >
                                <option value="">
                                    {loadingDest ? 'Chargement...' : '-- Sélectionner une destination --'}
                                </option>
                                {destinations.map((d) => (
                                    <option key={d.idDestination} value={d.idDestination}>
                                        {d.nomDestination} ({d.region})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-5">
                        <div className="flex items-center gap-3 border-b pb-4">
                            <CircleAlert className="h-5 w-5 text-primary" />
                            <h3 className="text-lg font-bold">Dates & Tarifs</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="dateDepart">Date de départ *</Label>
                                <Input id="dateDepart" type="date" required value={dateDepart} onChange={(e) => setDateDepart(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="dataRetour">Date de retour *</Label>
                                <Input id="dataRetour" type="date" required value={dataRetour} onChange={(e) => setDataRetour(e.target.value)} />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="prix">Prix (€) *</Label>
                                <Input id="prix" type="number" min="0" step="0.01" required value={prix} onChange={(e) => setPrix(e.target.value)} placeholder="0.00" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="placeDispo">Places disponibles *</Label>
                                <Input id="placeDispo" type="number" min="1" required value={placeDispo} onChange={(e) => setPlaceDispo(e.target.value)} placeholder="Ex: 20" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 justify-end">
                        <Button type="button" variant="outline" onClick={() => navigate('/voyages')} className="flex items-center gap-2">
                            <X className="h-4 w-4" />
                            Annuler
                        </Button>
                        <Button type="submit" disabled={loading} className="flex items-center gap-2">
                            <Save className="h-4 w-4" />
                            {loading ? 'Création...' : 'Créer le voyage'}
                        </Button>
                    </div>
                </form>
            </main>
        </AppSidebarLayout>
    );
}
