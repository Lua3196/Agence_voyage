<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Voyage extends Model
{
    protected $table = "Voyage";
    protected $primaryKey = "idVoyage";

    protected $fillable = [
        'titre',
        'description',
        'dateDepart',
        'dataRetour',
        'prix',
        'placeDispo',
        'idDestination'
    ];

    public function destination(){
        return $this->belongsTo(Destination::class, 'idDestination');
    }

    public function reservation(){
        return $this->hasMany(Reservation::class, 'idVoyage');
    }
}
