import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleAlert, FileText, Image } from 'lucide-react';
import AppSidebarLayout from '../../layouts/app/app-sidebar-layout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';

export default function VoyagesCreate() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
     const [description, setDescription] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: appel API Laravel
        navigate('/voyages');
    };

    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Tableau de Bord', href: '/dashboard' },
                { title: 'Voyages', href: '/voyages' },
                { title: 'Créer un voyage personnalisé', href: '/voyages/create' },
            ]}
        >
          { /* <div className="flex flex-1 flex-col gap-4 rounded-xl  ">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[800px] h-[800px] border-2 rounded-2xl p-8 justify-center">
                    <h1 className="text-2xl font-bold">Créer un voyage personnalisé</h1>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nom du voyage</Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Mon voyage..."
                        />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Mon voyage..."
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button type="submit">Créer</Button>
                        <Button type="button" variant="outline" onClick={() => navigate('/voyages')}>
                            Annuler
                        </Button>
                    </div>
                </form>
            </div>*/}
             <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
       
        <div className="mb-10 text-center md:text-left">
            <h2 className="text-text-main text-3xl md:text-4xl font-black leading-tight tracking-tight mb-3">Crée un circuit de voyage</h2>
            <p className="text-text-secondary text-lg font-normal max-w-2xl">Remplissez les détails ci-dessous pour mettre
                en place un nouveau circuit de voyage</p>
        </div>

        <form method="POST" action="/offres"  className="space-y-8">
           

            <div className="bg-surface-light rounded-xl shadow-sm border border-border-color p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-3 border-b border-border-color pb-4 mb-6">
                    <CircleAlert/>
                    <h3 className="text-xl font-bold text-text-main">Informations générales</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
   
                    <div className="col-span-1 md:col-span-2 space-y-2">
                        <Label className="block text-text-main text-base font-medium" >Titre du voyage</Label>
                        <Input
                            className=" rounded-lg border-border-color bg-background-light text-text-main focus:ring-2 focus:ring-primary focus:border-transparent h-12 px-4 placeholder:text-text-secondary/50 transition-all font-sans"
                            id="title" name="name"
                            placeholder="Ex: Tour de Madagascar" type="text" required />
                        <p className="text-xs text-text-secondary pl-1">Soyez bref et precis</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-text-main text-base font-medium">Date de départ</label>
                            <div className="relative">
                                <Input
                                    className="w-full rounded-lg border-border-color bg-background-light text-text-main focus:ring-2 focus:ring-primary focus:border-transparent h-12 pl-4 pr-12 placeholder:text-text-secondary/50 transition-all font-semibold text-lg font-sans"
                                    id="price" name="price"  type="date"
                                    required />
                               
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-text-main text-base font-medium">Date de retour</label>
                            <div className="relative">
                                <Input
                                    className="w-full rounded-lg border-border-color bg-background-light text-text-main focus:ring-2 focus:ring-primary focus:border-transparent h-12 pl-4 pr-12 placeholder:text-text-secondary/50 transition-all font-semibold text-lg font-sans"
                                    id="location" name="location"
                                     type="date" required />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-text-main text-base font-medium " >Place
                            disponible</label>
                        <Input
                        type="number"
                            className=" w-[200px] rounded-lg border-border-color bg-background-light text-text-main focus:ring-2 focus:ring-primary focus:border-transparent h-12 px-4 placeholder:text-text-secondary/50 transition-all font-sans"
                            id="number" name="number" min="1" required />
                    </div>
                </div>
            </div>

    
            <div className="bg-surface-light rounded-xl shadow-sm border border-border-color p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-3 border-b border-border-color pb-4 mb-6">
                    <FileText/>
                    <h3 className="text-xl font-bold text-text-main">Détails et Prix</h3>
                </div>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-text-main text-base font-medium" >Description</label>
                        <Textarea
                            className="w-full rounded-lg border-border-color bg-background-light text-text-main focus:ring-2 focus:ring-primary focus:border-transparent p-4 placeholder:text-text-secondary/50 resize-y transition-all font-sans"
                            id="description" name="description" placeholder="Décrivez le circuit en détail..."
                            required></Textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-text-main text-base font-medium">Prix (€)</label>
                            <div className="relative">
                                <Input
                                    className="w-full rounded-lg border-border-color bg-background-light text-text-main focus:ring-2 focus:ring-primary focus:border-transparent h-12 pl-4 pr-12 placeholder:text-text-secondary/50 transition-all font-semibold text-lg font-sans"
                                    id="price" name="price" placeholder="0.00" type="text"
                                    required />
                               
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-text-main text-base font-medium">Emplacement</label>
                            <div className="relative">
                                <Input
                                     className="w-full rounded-lg border-border-color bg-background-light text-text-main focus:ring-2 focus:ring-primary focus:border-transparent h-12 pl-4 pr-12 placeholder:text-text-secondary/50 transition-all font-semibold text-lg font-sans"
                                    id="location" name="location"
                                    placeholder="Ville" type="text" required />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

         
            <div className="bg-surface-light rounded-xl shadow-sm border border-border-color p-6 md:p-8 space-y-6">
                <div className="flex items-center gap-3 border-b border-border-color pb-4 mb-6">
                    <Image/>
                    <h3 className="text-xl font-bold text-text-main">Photos</h3>
                </div>
                <div className="space-y-4">
                    <label className="block text-text-main text-base font-medium">Ajouter une image principale</label>
                    <input type="file" name="product_image" className="w-full text-text-secondary file:transition-all file:scale-102  file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all" required/>
                </div>
            </div>

   
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-12">
                <a href="/"
                    className="w-full sm:w-auto px-8 py-3 rounded-lg text-text-main font-semibold hover:bg-gray-100 transition-colors text-center">
                    Annuler
                </a>
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                    <button
                        className="w-full sm:w-auto px-8 py-3 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                        type="submit">
                        <span>Publier le circuit</span>
                    </button>
                </div>
            </div>
        </form>
    </main>
        </AppSidebarLayout>
    );
}
