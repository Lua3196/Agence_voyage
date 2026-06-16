
export default function SideBarClient(){
    return(
        <>
        <div className="hidden md:flex flex-col w-64 shrink-0 gap-8 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto scrollbar-hide">
   
    <div className="space-y-4">
        <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider px-2">Catégories</h2>
        <div className="flex flex-col gap-1">
            <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg {{ !request('categorie') ? 'bg-primary/10 text-primary font-medium' : 'text-text-main hover:bg-gray-100 transition-colors' }}"
                href="/">
                <span className="material-symbols-outlined fill-current">grid_view</span>
                Toutes les catégories
            </a>

            {/*  const categories = [
                    ['name' => 'Mobilier de bureau', 'icon' => 'chair', 'tag' => 'Mobilier'],
                    ['name' => 'Informatique', 'icon' => 'computer', 'tag' => 'Informatique'],
                    ['name' => 'Imprimantes & Scanners', 'icon' => 'print', 'tag' => 'Imprimantes'],
                    ['name' => 'Rangement & Stockage', 'icon' => 'inventory_2', 'tag' => 'Rangement'],
                    ['name' => 'Espace Pause', 'icon' => 'coffee_maker', 'tag' => 'Pause'],
                ];
              */}
            

            {/*boucle*/}
                <a className="flex items-center gap-3 px-3 py-2.5 rounded-lg {{ request('categorie') === $category['tag'] ? 'bg-primary/10 text-primary font-medium' : 'text-text-main hover:bg-gray-100 transition-colors group' }}"
                    href="/?categorie={{ $category['tag'] }}">
                </a>
        
        </div>
    </div>
    <div className="space-y-4 pt-4 border-t border-border-color">
       <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">État du produit</h2>
        
        <form action="/" method="GET" id="sidebar-filters">
             <input type="hidden" name="q" value="{{ request('q') }}"/>
             <input type="hidden" name="categorie" value="{{ request('categorie') }}"/> 

            <div className="flex flex-col gap-3">
                {/* boucle */}
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <input type="checkbox" 
                               name="filtres[]" 
                               value="{{ $filtre->id_filtre }}"
                               className="size-5 ml-3 rounded border-gray-300 text-[#D97706] focus:ring-[#D97706] transition-all"/>
                        { /*is_array(request('filtres')) && in_array($filtre->id_filtre, request('filtres')) ? 'checked' : '' */ }
                        <span className="text-sm text-text-main group-hover:text-[#D97706] transition-colors">
                            {/* $filtre->nom_filtre*/ }
                        </span>
                    </label>
                {/*cloture du boucle */}
            </div>
        </form>

       
    </div>

    <div className="mt-auto p-4 bg-background-dark text-white rounded-xl relative overflow-hidden group">
        <div className="relative z-10">
            <p className="font-bold text-lg mb-1">Attic Pro</p>
            <p className="text-xs text-gray-300 mb-3">Boostez vos ventes avec un compte professionnel.</p>
            <button
                className="text-xs bg-primary text-black font-bold px-3 py-1.5 rounded shadow-sm hover:bg-white transition-colors">Découvrir</button>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-20 text-primary">
                <path d="M12 2L1 21h22L12 2zm0 3.83L19.17 19H4.83L12 5.83z"></path>
        </div>
    </div>
</div>
        </>
    )
}

