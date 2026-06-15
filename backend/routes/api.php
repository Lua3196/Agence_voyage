<?php

use App\Http\Controllers\AuthClientController;
use App\Http\Controllers\AuthAdminController;
use App\Http\Controllers\DestinationController;
use App\Http\Controllers\VoyageController;
use Illuminate\Support\Facades\Route;



Route::prefix('client')->group(function(){
    Route::post('/register', [AuthClientController::class, 'register']);
    Route::post('/login', [AuthClientController::class, 'login']);
    ROute::middleware('auth:sanctum')->group(function(){
        Route::post('/logout', [AuthClientController::class, 'logout']);
    });
});

Route::prefix('admin')->group(function(){
    Route::post('/register', [AuthAdminController::class, 'register']);
    Route::post('/login', [AuthAdminController::class, 'login']);
    ROute::middleware('auth:sanctum')->group(function(){
        Route::post('/logout', [AuthAdminController::class, 'logout']);
    });
});


Route::get('/destination', [DestinationController::class, 'index']);
Route::get('destination/{destination}', [DestinationController::class, 'show']);


//seul admin est authorisé pour create, update et destroy pour Voyage
//client et admin
Route::get('voyage', [VoyageController::class, 'index']);
Route::get('voyage/{voyage}', [VoyageController::class, 'show']);

    //admin seulement
Route::middleware('auth:admin')->group(function () {
    Route::post('voyage', [VoyageController::class, 'store']);
    Route::put('voyage/{voyage}', [VoyageController::class, 'update']);
    Route::delete('voyage/{voyage}', [VoyageController::class, 'destroy']); 
});  
    