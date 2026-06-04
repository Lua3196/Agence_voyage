<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    protected $table = "reservation";
    protected $primaryKey = "idReservation";

    protected $fillable = [
        'dateReservation',
        'nombrePersonnes',
        'montantTotal',
        'statut',
        'idClient',
        'idVoyage'
    ];

    public function client(){
        return $this->belongsTo(Client::class, 'idClient');
    }

    public function voyage(){
        return $this->belongsTo(Voyage::class, 'idVoyage');
    }

    public function paiement(){
        return $this->hasOne(Paiement::class, 'idReservation');
    }
}
