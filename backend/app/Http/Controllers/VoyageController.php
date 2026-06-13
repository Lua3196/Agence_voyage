<?php

namespace App\Http\Controllers;

use App\Http\Requests\storeVoyageRequest;
use App\Models\Voyage;
use Illuminate\Http\Request;

class VoyageController extends Controller
{
    public function index(Request $request)
    {
      $voyage = Voyage::with(['destination:idDestination,nomDestination'])->select('idVoyage', 'dateDepart', 'dataRetour', 'placeDispo','prix' )->get();

      return response()->json(['data'=>$voyage]);
    }
    

    public function show($id)
    {
        $voyage = Voyage::with('destination')->findOrFail($id);

        return response()->json(['data'=> $voyage]);
    }

    public function store(storeVoyageRequest $request)
    {
       $voyage = Voyage::create($request->validated());

       return response()->json([
        'message' => 'Voyage crée avec succès',
        'data' => $voyage
       ], 201);
    }

    

    public function update(Request $request, Offres $offre)
{
    // 1. Validation : 'product_image' devient 'sometimes' ou 'nullable'
    $attributes = $request->validate([
        'name' => ['required'],
        'price' => ['required'], 
        'number' => ['required'], 
        'location' => ['required'],
        'schedule' => ['required', Rule::in(['Vente immédiate', 'Sur commande'])], 
        'category' => ['required'],
        'description' => ['required'],
        'product_image' => ['nullable', File::types(['png', 'jpg'])], // Rendu optionnel
        'url' => ['nullable'],
        'tags' => ['nullable'],
    ]);

    Gate::authorize('edit', $offre);

    // 2. Gestion de l'image
    if ($request->hasFile('product_image')) {
        $attributes['image'] = $request->file('product_image')->store('logos', 'public');
    }

    // 3. Mise à jour des données
    $offre->update([
        'nom_offre' => $attributes['name'],
        'prix' => $attributes['price'],
        'quantite' => $attributes['number'],
        'Localisation' => $attributes['location'],
        'type' => $attributes['schedule'],
        'id_categorie' => $attributes['category'], 
        'description' => $attributes['description'],
        'image' => $attributes['image'] ?? $offre->image, // Garde l'ancienne si pas de nouvelle
        'favoris' => false,
    ]);

    // 4. Synchronisation des filtres (Correction du nom : 'filtres' match avec le name du form)
    $offre->filtres()->sync($request->filtre ?? []);

    return redirect('/offres/' . $offre->id_offre);
}
        public function destroy(Offres $offre)
    {

        Gate::authorize('edit', $offre);

        $offre->delete();

        return redirect('/');
    }
}
