<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\Location;

class ValidateLocationMiddleware
{
    public function handle($request, Closure $next)
    {
        $locationId = $request->route('id');
        $location = Location::find($locationId);
        if (!$location) {
            return response()->json(['error' => 'Location not found'], 404);
        }
        return $next($request);
    }
}
