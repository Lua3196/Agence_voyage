<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
     public function index(Request $request)
    {
      $destinations = Destination::all();

      foreach ($destinations as $destination){
        $destination->image = asset('storage/' . $destination->image);
      }

      return response()->json(['data'=>$destinations]);
    }
    

    public function show(Destination $destination)
    {
      $destination->image = asset('storage/' . $destination->image);

      return response()->json(['data'=> $destination]);
    }

}
