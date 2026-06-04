<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Destination extends Model
{
    protected $table = "Destination";
    protected $primaryKey = "idDestination";

    protected $fillable = [
        'nomDestination',
        'region',
        'description',
        'image'
    ];

    public function voyage(){
        return $this->hasMany(Voyage::class, 'idDestination');
    }
}
