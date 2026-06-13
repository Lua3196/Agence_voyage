<?php

use App\Http\Controllers\VoyageController;
use Illuminate\Support\Facades\Route;

//seul admin est authorisé pour create, update et destroy pour Voyage
Route::prefix('api')->group(function(){
    //client et admin
    Route::get('voyage', [VoyageController::class, 'index']);
    Route::get('voyage/{id}', [VoyageController::class, 'show']);

    //admin seulement
    Route::middleware('auth:admin')->group(function () {
        Route::post('voyage', [VoyageController::class, 'store']);
        Route::put('voyage/{id}', [VoyageController::class, 'update']);
        Route::delete('voyage/{id}', [VoyageController::class, 'destroy']); 
    });
});  
    