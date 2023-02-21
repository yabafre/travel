<?php

namespace App\Http\Middleware;
use App\Models\Location;
use App\Models\Place;
use Closure;

class ValidatePlaceMiddleware
{
    public function handle($request, Closure $next)
    {
        $placeId = $request->route('id');
        $place = Place::find($placeId);
        if (!$place) {
            return response()->json(['error' => 'Place not found'], 404);
        }

        return $next($request);
    }

}
