<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Models\Admin;
use Hash;
use Illuminate\Http\Request;

class AuthAdminController extends Controller
{
      public function login(LoginRequest $request){
        $admin = Admin::where('email', $request->email)->first();

        if(!$admin || !Hash::check($request->mdp, $admin->mdp)){
            return response()->json([
                'message' => 'Email ou mot de passe incorrect'
            ], 401);
        }

        $token = $admin->createToken('admin_token')->plainTextToken;

        return response()->json([
            'message' => 'Connexion réussie',
            'client' => $admin,
            'token' => $token
        ]);
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Déconnexion réussie']);
    }
}
