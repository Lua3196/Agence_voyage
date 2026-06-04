<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Paiement extends Model
{
    protected $table = "Paiement";
    protected $primaryKey = "idPaiement";

    protected $fillable = [
        'montant',
        'datePaiement',
        'modePaiement',
        'preuvePaiment',
        'statutVerification',
        'idReservation'
    ];

    public function reservation(){
        return $this->belongsTo(Reservation::class, 'idReservation');
    }
}
