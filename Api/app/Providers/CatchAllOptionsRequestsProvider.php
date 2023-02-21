<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Contracts\Http\Kernel;

class CatchAllOptionsRequestsProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @param  \Illuminate\Contracts\Http\Kernel  $kernel
     * @return void
     */
//    public function boot(Kernel $kernel)
//    {
//        $kernel->pushMiddleware('App\Http\Middleware\CorsMiddleware');
//    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
        $request = app('request');

        if ($request->isMethod('OPTIONS'))
        {
            app()->options($request->path(), function() { return response('', 200); });
        }
    }
}
