<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Admin extends Model
{
    protected $table = "Admin";
    protected $primaryKey = "idAdmin";
    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'mdp'
    ];

    protected $hidden = ['mdp'];
}
