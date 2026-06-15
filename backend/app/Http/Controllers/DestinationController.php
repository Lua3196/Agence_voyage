<?php

namespace App\Http\Controllers;

use App\Models\Destination;
use Illuminate\Http\Request;

class DestinationController extends Controller
{
     public function index(Request $request)
    {
      $destination = Destination::all();

      return response()->json(['data'=>$destination]);
    }
    

    public function show(Destination $destination)
    {
        return response()->json(['data'=> $destination]);
    }
}
