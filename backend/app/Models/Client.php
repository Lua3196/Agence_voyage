<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $table = "Client";
    protected $primaryKey = "idClient";
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'numTel',
        'mdp'
    ];

    protected $hidden = ['mdp'];

    public function reservation(){
        return $this->hasMany(Reservation::class, 'idClient');
    }
}
