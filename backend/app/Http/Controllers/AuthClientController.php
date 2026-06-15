<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\Client;
use Hash;
use Illuminate\Http\Request;

class AuthClientController extends Controller
{
    public function register(RegisterRequest $request){
        
        $client = Client::create([
            'nom' =>$request->nom,
            'prenom'=>$request->prenom,
            'email'=>$request->email,
            'numTel'=>$request->numTel,
            'mdp'=>Hash::make($request->mdp),
        ]);

        $token = $client->createToken('client_token')->plainTextToken;

        return response()->json([
            'message' => 'Inscription réussie',
            'client' => $client,
            'token' => $token
        ], 201);
    }

    public function login(LoginRequest $request){
        $client = Client::where('email', $request->email)->first();

        if(!$client || !Hash::check($request->mdp, $client->mdp)){
            return response()->json([
                'message' => 'Email ou mot de passe incorrect'
            ], 401);
        }

        $token = $client->createToken('client_token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'client' => $client,
            'token' => $token
        ]);
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnexion réussie']);
    }
}
