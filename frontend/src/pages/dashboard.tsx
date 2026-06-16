import { useEffect, useState } from 'react';
import { Plane, MapPin, Users, TrendingUp, Globe, UserCircle } from 'lucide-react';
import AppSidebarLayout from '../layouts/app/app-sidebar-layout';
import { AlertMessage, SkeletonRow, EmptyState } from '../components/ui/alert-message';
import { getVoyages, getDestinations, getClients, type Voyage, type Destination, type Client } from '../lib/api';

// ── Stat card ──────────────────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, color }: {
    icon: React.FC<{ className?: string }>;
    label: string;
    value: string | number;
    color: string;
}) {
    return (
        <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 bg-card p-5 shadow-sm flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color}`}>
                <Icon className="h-6 w-6 text-white" />
            </div>
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    );
}

// ── Destinations table ─────────────────────────────────────────────────────
function DestinationsTable({ destinations, loading, error }: {
    destinations: Destination[];
    loading: boolean;
    error: string;
}) {
    return (
        <div className="rounded-xl border border-sidebar-border/70 overflow-hidden shadow-sm">
            <div className="flex items-center gap-2 px-5 py-4 border-b bg-muted/30">
                <Globe className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-base">Destinations</h2>
                <span className="ml-auto text-xs text-muted-foreground">{destinations.length} enregistrement(s)</span>
            </div>
            {error && <AlertMessage type="error" message={error} className="m-4" />}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Nom</th>
                            <th className="px-4 py-3">Région</th>
                            <th className="px-4 py-3">Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading
                            ? Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} cols={4} />)
                            : destinations.length === 0
                            ? (
                                <tr><td colSpan={4}><EmptyState icon={Globe} title="Aucune destination" /></td></tr>
                            )
                            : destinations.map((d) => (
                                <tr key={d.idDestination} className="border-b border-border hover:bg-muted/30 transition-colors">
                                    <td className="px-4 py-3 text-sm text-muted-foreground">{d.idDestination}</td>
                                    <td className="px-4 py-3">
                                        <span className="flex items-center gap-2 font-medium text-sm">
                                            <MapPin className="h-4 w-4 text-primary shrink-0" />
                                            {d.nomDestination}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">{d.region}</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground max-w-xs truncate">{d.description}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ── Clients table ──────────────────────────────────────────────────────────
function ClientsTable({ clients, loading, error }: {
    clients: Client[];
    loading: boolean;
    error: string;
}) {
    return (
        <div className="rounded-xl border border-sidebar-border/70 overflow-hidden shadow-sm">
            <div className="flex items-center gap-2 px-5 py-4 border-b bg-muted/30">
                <Users className="h-5 w-5 text-primary" />
                <h2 className="font-semibold text-base">Clients</h2>
                <span className="ml-auto text-xs text-muted-foreground">{clients.length} enregistrement(s)</span>
            </div>
            {error && <AlertMessage type="error" message={error} className="m-4" />}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                        <tr>
                            <th className="px-4 py-3">#</th>
                            <th className="px-4 py-3">Nom complet</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Téléphone</th>
                            <th className="px-4 py-3">Inscrit le</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading
                            ? Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} cols={5} />)
                            : clients.length === 0
                            ? (
                                <tr><td colSpan={5}><EmptyState icon={UserCircle} title="Aucun client" description="Aucun client enregistré pour le moment." /></td></tr>
                            )
                            : clients.map((c) => (
                                <tr key={c.idClient} className="border-b border-border hover:bg-muted/30 transition-colors">
                                    <td className="px-4 py-3 text-sm text-muted-foreground">{c.idClient}</td>
                                    <td className="px-4 py-3">
                                        <span className="flex items-center gap-2 text-sm font-medium">
                                            <UserCircle className="h-4 w-4 text-primary shrink-0" />
                                            {c.prenom} {c.nom}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">{c.email}</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">{c.numTel}</td>
                                    <td className="px-4 py-3 text-sm text-muted-foreground">
                                        {new Date(c.created_at).toLocaleDateString('fr-FR')}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ── Dashboard page ─────────────────────────────────────────────────────────
export default function Dashboard() {
    const [voyages, setVoyages] = useState<Voyage[]>([]);
    const [destinations, setDestinations] = useState<Destination[]>([]);
    const [clients, setClients] = useState<Client[]>([]);

    const [loadingV, setLoadingV] = useState(true);
    const [loadingD, setLoadingD] = useState(true);
    const [loadingC, setLoadingC] = useState(true);

    const [errorV, setErrorV] = useState('');
    const [errorD, setErrorD] = useState('');
    const [errorC, setErrorC] = useState('');

    useEffect(() => {
        getVoyages()
            .then((r) => setVoyages(r.data))
            .catch((e: unknown) => setErrorV(e instanceof Error ? e.message : 'Erreur'))
            .finally(() => setLoadingV(false));

        getDestinations()
            .then((r) => setDestinations(r.data))
            .catch((e: unknown) => setErrorD(e instanceof Error ? e.message : 'Erreur'))
            .finally(() => setLoadingD(false));

        getClients()
            .then((r) => setClients(r.data))
            .catch((e: unknown) => setErrorC(e instanceof Error ? e.message : 'Erreur'))
            .finally(() => setLoadingC(false));
    }, []);

    const totalPlaces = voyages.reduce((sum, v) => sum + v.placeDispo, 0);
    const revenuEstime = voyages.reduce((sum, v) => sum + v.prix, 0);

    return (
        <AppSidebarLayout breadcrumbs={[{ title: 'Tableau de Bord', href: '/dashboard' }]}>
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-6">

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-3">
                    <StatCard icon={Plane} label="Voyages" value={loadingV ? '…' : voyages.length} color="bg-blue-500" />
                    <StatCard icon={Globe} label="Destinations" value={loadingD ? '…' : destinations.length} color="bg-green-500" />
                    <StatCard icon={Users} label="Clients" value={loadingC ? '…' : clients.length} color="bg-purple-500" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <StatCard icon={Users} label="Places disponibles" value={loadingV ? '…' : totalPlaces} color="bg-orange-400" />
                    <StatCard icon={TrendingUp} label="Revenus estimés" value={loadingV ? '…' : `${revenuEstime.toLocaleString('fr-FR')} €`} color="bg-pink-500" />
                </div>

                {/* Voyages table (mini) */}
                <div className="rounded-xl border border-sidebar-border/70 overflow-hidden shadow-sm">
                    <div className="flex items-center gap-2 px-5 py-4 border-b bg-muted/30">
                        <Plane className="h-5 w-5 text-primary" />
                        <h2 className="font-semibold text-base">Voyages récents</h2>
                        <span className="ml-auto text-xs text-muted-foreground">{voyages.length} voyage(s)</span>
                    </div>
                    {errorV && <AlertMessage type="error" message={errorV} className="m-4" />}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-3">Titre</th>
                                    <th className="px-4 py-3">Destination</th>
                                    <th className="px-4 py-3">Départ</th>
                                    <th className="px-4 py-3">Places</th>
                                    <th className="px-4 py-3">Prix</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loadingV
                                    ? Array.from({ length: 3 }).map((_, i) => <SkeletonRow key={i} cols={5} />)
                                    : voyages.length === 0
                                    ? <tr><td colSpan={5}><EmptyState icon={Plane} title="Aucun voyage" /></td></tr>
                                    : voyages.slice(0, 5).map((v) => (
                                        <tr key={v.idVoyage} className="border-b border-border hover:bg-muted/30 transition-colors">
                                            <td className="px-4 py-3 text-sm font-medium">{v.titre}</td>
                                            <td className="px-4 py-3 text-sm text-muted-foreground">
                                                {v.destination?.nomDestination ?? `#${v.idDestination}`}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-muted-foreground">
                                                {new Date(v.dateDepart).toLocaleDateString('fr-FR')}
                                            </td>
                                            <td className="px-4 py-3 text-sm text-muted-foreground">{v.placeDispo}</td>
                                            <td className="px-4 py-3 text-sm font-semibold text-primary">{v.prix} €</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <DestinationsTable destinations={destinations} loading={loadingD} error={errorD} />
                <ClientsTable clients={clients} loading={loadingC} error={errorC} />
            </div>
        </AppSidebarLayout>
    );
}
