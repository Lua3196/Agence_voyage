import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, PlusCircle, Plane } from 'lucide-react';
import AppSidebarLayout from '../../layouts/app/app-sidebar-layout';
import { Button } from '../../components/ui/button';
import { AlertMessage, EmptyState, SkeletonRow } from '../../components/ui/alert-message';
import { getVoyages, type Voyage } from '../../lib/api';

function VoyageRow({ voyage }: { voyage: Voyage }) {
    const duree = Math.ceil(
        (new Date(voyage.dataRetour).getTime() - new Date(voyage.dateDepart).getTime()) / (1000 * 60 * 60 * 24)
    );

    return (
        <tr className="border-b border-border hover:bg-muted/40 transition-colors">
            <td className="px-4 py-3 font-medium text-sm">{voyage.titre}</td>
            <td className="px-4 py-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {voyage.destination?.nomDestination ?? `#${voyage.idDestination}`}
                </span>
            </td>
            <td className="px-4 py-3 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(voyage.dateDepart).toLocaleDateString('fr-FR')}
                </span>
            </td>
            <td className="px-4 py-3 text-sm text-muted-foreground">{duree} j</td>
            <td className="px-4 py-3 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    {voyage.placeDispo}
                </span>
            </td>
            <td className="px-4 py-3 font-semibold text-sm text-primary">{voyage.prix.toLocaleString('fr-FR')} €</td>
            <td className="px-4 py-3">
                <Link to={`/description?id=${voyage.idVoyage}`}>
                    <Button size="sm" variant="outline">Détail</Button>
                </Link>
            </td>
        </tr>
    );
}

export default function VoyagesIndex() {
    const [voyages, setVoyages] = useState<Voyage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getVoyages()
            .then((res) => setVoyages(res.data))
            .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Erreur de chargement'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Tableau de Bord', href: '/dashboard' },
                { title: 'Voyages', href: '/voyages' },
            ]}
        >
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Liste des voyages</h1>
                        <p className="text-sm text-muted-foreground mt-1">{voyages.length} voyage(s) disponible(s)</p>
                    </div>
                    <Link to="/voyages/create">
                        <Button className="flex items-center gap-2">
                            <PlusCircle className="h-4 w-4" />
                            Nouveau voyage
                        </Button>
                    </Link>
                </div>

                {error && <AlertMessage type="error" message={error} />}

                <div className="rounded-xl border border-border overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                        <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3">Titre</th>
                                <th className="px-4 py-3">Destination</th>
                                <th className="px-4 py-3">Départ</th>
                                <th className="px-4 py-3">Durée</th>
                                <th className="px-4 py-3">Places</th>
                                <th className="px-4 py-3">Prix</th>
                                <th className="px-4 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading
                                ? Array.from({ length: 4 }).map((_, i) => <SkeletonRow key={i} cols={7} />)
                                : voyages.length === 0
                                ? (
                                    <tr>
                                        <td colSpan={7}>
                                            <EmptyState icon={Plane} title="Aucun voyage" description="Aucun voyage enregistré pour le moment." />
                                        </td>
                                    </tr>
                                )
                                : voyages.map((v) => <VoyageRow key={v.idVoyage} voyage={v} />)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
