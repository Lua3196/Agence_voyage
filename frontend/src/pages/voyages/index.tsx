import { Link } from 'react-router-dom';
import AppSidebarLayout from '../../layouts/app/app-sidebar-layout';
import { Button } from '../../components/ui/button';

export default function VoyagesIndex() {
    const listeReservation = [
        {id: 1 },
        {id: 2 },
        {id: 3 },
    ]
    return (
        <AppSidebarLayout
            breadcrumbs={[
                { title: 'Tableau de Bord', href: '/dashboard' },
                { title: 'Voyages', href: '/voyages' },
            ]}
        >
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <p className='m-3'>Liste des voyages</p>
                {listeReservation.map((voyage) =>
                <Link to="/Dashboard">
                <div className="flex h-[200px] shadow-md rounded-xl p-4 w-full transition-all duration-300 ease-out hover:scale-101 hover:cursor-pointer" key={voyage.id}>
                    <img  className=' w-35 h-35 bg-chart-4'></img>
                    <div className='flex flex-col ml-3 mt-5'>
                        <h1 className='text-xl font-semibold'>Fianarantsoa</h1>
                        <p>Lieu a visité:</p>
                    </div>
                </div>
                </Link>
                )}
                <div className="flex justify-end">
                    <Link to="/voyages/create">
                        <Button>Voyage personnalisé</Button>
                    </Link>
                </div>
            </div>
        </AppSidebarLayout>
    );
}
