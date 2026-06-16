<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Voyage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class ReservationController extends Controller
{
    /**
     * Lister les réservations du client connecté
     * GET /api/reservations
     */
    public function index()
    {
        $reservations = Reservation::with(['voyage.destination', 'paiement'])
            ->where('idClient', Auth::id())
            ->orderByDesc('created_at')
            ->get();

        return response()->json($reservations);
    }

    /**
     * Créer une réservation
     * POST /api/reservations
     * Body: { idVoyage, nombrePersonnes }
     *
     * ✅ On ne décrémente PAS placeDispo ici.
     * La décrémentation se fait uniquement quand l'admin valide le paiement.
     * On vérifie les places effectives = placeDispo - somme des réservations confirmées.
     */
    public function store(Request $request)
    {
        $request->validate([
            'idVoyage'        => 'required|exists:voyage,idVoyage',
            'nombrePersonnes' => 'required|integer|min:1',
        ]);

        $voyage = Voyage::findOrFail($request->idVoyage);

        // Calcul des places effectivement encore libres
        $placesConfirmees = Reservation::where('idVoyage', $voyage->idVoyage)
            ->where('statut', 'Confirmée')
            ->sum('nombrePersonnes');

        $placesEffectives = $voyage->placeDispo - $placesConfirmees;

        if ($placesEffectives < $request->nombrePersonnes) {
            return response()->json([
                'message' => "Pas assez de places disponibles. Il reste {$placesEffectives} place(s).",
            ], 422);
        }

        $reservation = Reservation::create([
            'dateReservation' => Carbon::today(),
            'nombrePersonnes' => $request->nombrePersonnes,
            'montantTotal'    => $voyage->prix * $request->nombrePersonnes,
            'statut'          => 'En attente',
            'idClient'        => Auth::id(),
            'idVoyage'        => $request->idVoyage,
        ]);

        return response()->json([
            'message'     => 'Réservation créée. Veuillez procéder au paiement.',
            'reservation' => $reservation->load('voyage'),
        ], 201);
    }

    /**
     * Détail d'une réservation du client connecté
     * GET /api/reservations/{id}
     */
    public function show($id)
    {
        $reservation = Reservation::with(['voyage.destination', 'paiement'])
            ->where('idClient', Auth::id())
            ->findOrFail($id);

        return response()->json($reservation);
    }

    /**
     * Annuler sa propre réservation
     * PATCH /api/reservations/{id}/annuler
     *
     * Pas de remise de places : on n'avait rien décrémenté.
     */
    public function annuler($id)
    {
        $reservation = Reservation::where('idClient', Auth::id())->findOrFail($id);

        if ($reservation->statut === 'Confirmée') {
            return response()->json([
                'message' => "Impossible d'annuler une réservation déjà confirmée.",
            ], 422);
        }

        $reservation->update(['statut' => 'Annulée']);

        return response()->json(['message' => 'Réservation annulée.']);
    }

    // ── Admin ──────────────────────────────────────────────────────────────────

    /**
     * [Admin] Toutes les réservations
     * GET /api/admin/reservations
     */
    public function adminIndex()
    {
        $reservations = Reservation::with(['voyage.destination', 'client', 'paiement'])
            ->orderByDesc('created_at')
            ->get();

        return response()->json($reservations);
    }

    /**
     * [Admin] Changement manuel de statut (sans toucher aux places)
     * PATCH /api/admin/reservations/{id}/statut
     */
    public function updateStatut(Request $request, $id)
    {
        $request->validate([
            'statut' => 'required|in:En attente,Paiement en vérification,Confirmée,Annulée',
        ]);

        $reservation = Reservation::findOrFail($id);
        $reservation->update(['statut' => $request->statut]);

        return response()->json(['message' => 'Statut mis à jour.', 'reservation' => $reservation]);
    }
}
