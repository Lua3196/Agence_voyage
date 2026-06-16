import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, MapPin, Calendar, Users, Plane, X } from 'lucide-react';
import { Header } from '../../components/header-home1';
import { AlertMessage, EmptyState } from '../../components/ui/alert-message';
import { getVoyages, type Voyage } from '../../lib/api';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

// ── Voyage card ────────────────────────────────────────────────────────────
function VoyageCardClient({ voyage }: { voyage: Voyage }) {
    const duree = Math.ceil(
        (new Date(voyage.dataRetour).getTime() - new Date(voyage.dateDepart).getTime()) / (1000 * 60 * 60 * 24)
    );
    return (
        <article className="group rounded-xl border border-border bg-card shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
            <div className="relative h-40 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                <Plane className="h-14 w-14 text-blue-400 opacity-50 group-hover:opacity-70 transition-opacity" />
                <span className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {voyage.prix.toLocaleString('fr-FR')} €
                </span>
            </div>
            <div className="p-4 flex flex-col flex-1 gap-2">
                <h3 className="font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors">{voyage.titre}</h3>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span>{voyage.destination?.nomDestination ?? `Destination #${voyage.idDestination}`}</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(voyage.dateDepart).toLocaleDateString('fr-FR')}
                    </span>
                    <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {voyage.placeDispo} places
                    </span>
                    <span className="ml-auto font-medium text-primary">{duree} j</span>
                </div>
                <Link to={`/description?id=${voyage.idVoyage}`} className="mt-auto">
                    <Button size="sm" className="w-full mt-2">Voir le détail</Button>
                </Link>
            </div>
        </article>
    );
}

// ── Sidebar filter ─────────────────────────────────────────────────────────
interface Filters {
    search: string;
    budgetMin: string;
    budgetMax: string;
    dureeMin: string;
    dureeMax: string;
}

function SidebarFilters({ filters, onChange, onReset }: {
    filters: Filters;
    onChange: (key: keyof Filters, val: string) => void;
    onReset: () => void;
}) {
    return (
        <aside className="hidden md:flex flex-col w-64 shrink-0 gap-6 sticky top-24 h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-semibold text-sm">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filtres
                </span>
                <button onClick={onReset} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                    <X className="h-3 w-3" />
                    Réinitialiser
                </button>
            </div>

            {/* Recherche */}
            <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recherche</label>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        className="pl-8 text-sm"
                        placeholder="Titre, destination..."
                        value={filters.search}
                        onChange={(e) => onChange('search', e.target.value)}
                    />
                </div>
            </div>

            {/* Budget */}
            <div className="space-y-3 border-t pt-4">
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Budget (€)</label>
                <div className="flex gap-2">
                    <Input
                        type="number"
                        placeholder="Min"
                        className="text-sm"
                        value={filters.budgetMin}
                        onChange={(e) => onChange('budgetMin', e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Max"
                        className="text-sm"
                        value={filters.budgetMax}
                        onChange={(e) => onChange('budgetMax', e.target.value)}
                    />
                </div>
            </div>

            {/* Durée */}
            <div className="space-y-3 border-t pt-4">
                <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Durée (jours)</label>
                <div className="flex gap-2">
                    <Input
                        type="number"
                        placeholder="Min"
                        className="text-sm"
                        value={filters.dureeMin}
                        onChange={(e) => onChange('dureeMin', e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Max"
                        className="text-sm"
                        value={filters.dureeMax}
                        onChange={(e) => onChange('dureeMax', e.target.value)}
                    />
                </div>
            </div>
        </aside>
    );
}

// ── Page ───────────────────────────────────────────────────────────────────
const DEFAULT_FILTERS: Filters = {
    search: '',
    budgetMin: '',
    budgetMax: '',
    dureeMin: '',
    dureeMax: '',
};

export default function HomeClient() {
    const [voyages, setVoyages] = useState<Voyage[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);

    useEffect(() => {
        getVoyages()
            .then((r) => setVoyages(r.data))
            .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Erreur de chargement'))
            .finally(() => setLoading(false));
    }, []);

    const handleFilter = (key: keyof Filters, val: string) =>
        setFilters((prev) => ({ ...prev, [key]: val }));

    const filtered = useMemo(() => {
        return voyages.filter((v) => {
            const duree = Math.ceil(
                (new Date(v.dataRetour).getTime() - new Date(v.dateDepart).getTime()) / (1000 * 60 * 60 * 24)
            );
            const searchLower = filters.search.toLowerCase();
            if (searchLower && !v.titre.toLowerCase().includes(searchLower) &&
                !(v.destination?.nomDestination?.toLowerCase().includes(searchLower))) {
                return false;
            }
            if (filters.budgetMin && v.prix < parseFloat(filters.budgetMin)) return false;
            if (filters.budgetMax && v.prix > parseFloat(filters.budgetMax)) return false;
            if (filters.dureeMin && duree < parseInt(filters.dureeMin)) return false;
            if (filters.dureeMax && duree > parseInt(filters.dureeMax)) return false;
            return true;
        });
    }, [voyages, filters]);

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 flex gap-8">
                <SidebarFilters
                    filters={filters}
                    onChange={handleFilter}
                    onReset={() => setFilters(DEFAULT_FILTERS)}
                />

                <main className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-xl font-bold">
                            {loading ? 'Chargement…' : `${filtered.length} voyage(s) trouvé(s)`}
                        </h1>
                    </div>

                    {error && <AlertMessage type="error" message={error} className="mb-4" />}

                    {/* Mobile search bar */}
                    <div className="md:hidden mb-4">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                className="pl-8"
                                placeholder="Rechercher..."
                                value={filters.search}
                                onChange={(e) => handleFilter('search', e.target.value)}
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="rounded-xl border border-border overflow-hidden">
                                    <div className="h-40 bg-muted animate-pulse" />
                                    <div className="p-4 space-y-3">
                                        <div className="h-4 bg-muted animate-pulse rounded" />
                                        <div className="h-3 w-2/3 bg-muted animate-pulse rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filtered.length === 0 ? (
                        <EmptyState
                            icon={Plane}
                            title="Aucun voyage trouvé"
                            description="Modifiez vos filtres pour voir plus de résultats."
                        />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {filtered.map((v) => (
                                <VoyageCardClient key={v.idVoyage} voyage={v} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
