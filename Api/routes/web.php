<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->group(['prefix' => 'api'], function () use ($router) {
    // location routers
    $router->get('locations', 'Api\LocationController@index');
    $router->get('locations/{id}', ['middleware' => 'App\Http\Middleware\ValidateLocationMiddleware','uses'=>'Api\LocationController@show']);
    $router->post('locations', 'Api\LocationController@create');
    $router->post('locations/{id}', ['middleware' => 'App\Http\Middleware\ValidateLocationMiddleware','uses'=>'Api\LocationController@update']);
    $router->delete('locations/{id}', ['middleware' => 'App\Http\Middleware\ValidateLocationMiddleware','uses'=>'Api\LocationController@delete']);
    // place visited for location routers
    $router->get('locations/{id}/places', ['middleware' => 'App\Http\Middleware\ValidateLocationMiddleware','uses'=>'Api\PlaceController@index']);
    $router->get('places/{id}', ['middleware' => 'App\Http\Middleware\ValidatePlaceMiddleware','uses'=>'Api\PlaceController@show']);
    $router->post('locations/{location_id}/places', 'Api\PlaceController@create');
    $router->post('places/{id}', ['middleware' => 'App\Http\Middleware\ValidatePlaceMiddleware','uses'=>'Api\PlaceController@update']);
    $router->delete('places/{id}', ['middleware' => 'App\Http\Middleware\ValidatePlaceMiddleware','uses'=>'Api\PlaceController@delete']);
    return $router;
});
