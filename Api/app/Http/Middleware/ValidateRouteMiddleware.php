<?php

namespace App\Http\Middleware;

use Closure;

class ValidateRouteMiddleware
{
    public function handle($request, Closure $next)
    {
        $route = $request->route();
        if (!$route) {
            return response()->json(['error' => 'Route not found'], 404);
        }
        return $next($request);
    }
}
