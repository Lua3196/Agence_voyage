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
    

    public function show(Voyage $voyage)
    {
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

    

    public function update(storeVoyageRequest $request, Voyage $voyage)
    {
        $voyage->update($request->validated());
        return response()->json(['message' => 'Voyage modifié avec succès', 'data' => $voyage]);
    }

    public function destroy(Voyage $voyage)
    {
        $voyage->delete();
        return response()->json(['message' => 'Voyage supprimé avec succès']);
    }
}
