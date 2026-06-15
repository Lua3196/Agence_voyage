<?php

use App\Http\Controllers\VoyageController;
use Illuminate\Support\Facades\Route;

//seul admin est authorisé pour create, update et destroy pour Voyage
Route::prefix('api')->group(function(){
    //client et admin
    Route::get('voyage', [VoyageController::class, 'index']);
    Route::get('voyage/{voyage}', [VoyageController::class, 'show']);

    //admin seulement
    Route::middleware('auth:admin')->group(function () {
        Route::post('voyage', [VoyageController::class, 'store']);
        Route::put('voyage/{voyage}', [VoyageController::class, 'update']);
        Route::delete('voyage/{voyage}', [VoyageController::class, 'destroy']); 
    });
});  
    