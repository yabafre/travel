<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Location;
use App\Models\Place;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PlaceController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return JsonResponse
     */
    public function index($id): JsonResponse
    {
        $places = Place::where('location_id', $id)->get();
        return response()->json($places);
    }
    public function show($id): JsonResponse
    {
        $place = Place::with('location')->find($id);
        return response()->json($place);
    }
    /**
     * @throws ValidationException
     */
    public function create(request $request, $location_id): JsonResponse
    {
        $this->validate($request, [
            'name' => 'required|unique:places,name',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'visited' => 'required|boolean',
        ]);

        $location = Location::find($location_id);
        if (!$location) {
            return response()->json(['error' => 'Location not found'], 404);
        }
        $place = new Place($request->all());
        $place->location()->associate($location);
        $place->save();
        return response()->json(['message' => 'success',
            'values'=> $place], 201);
    }
    /**
     * @throws ValidationException
     */
    public function update(request $request, $id): JsonResponse
    {
        $place = Place::find($id);
        $this->validate($request, [
            'name' => 'required|unique:places,name,' . $id,
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
            'visited' => 'required|boolean',
        ]);
        $place->name = $request->input('name');
        $place->lat = $request->input('lat');
        $place->lng = $request->input('lng');
        $place->visited = $request->input('visited');
        $place->save();

        return response()->json(['message' => 'success'], 204);
    }

    public function delete($id): JsonResponse
    {
        $place = Place::find($id);
        $place->delete();
        return response()->json(['message' => 'success'], 200);
    }
    //
}
