<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Location;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class LocationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): JsonResponse
    {
        $location = Location::with('place')->get();
        return response()->json($location, 201);
    }

    public function show($id): JsonResponse
    {
        $location = Location::with('place')->find($id);
//        if (!$location) {
//            return response()->json(['error' => 'Location not found'], 404);
//        }
        return response()->json($location, 201);
    }

    /**
     * @throws ValidationException
     */
    public function create(request $request): JsonResponse
    {
        $this->validate($request, [
            'name' => 'required|unique:locations',
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
        ]);
        $slug = $request->input('name');
        $location = new Location($request->all());
        $location->slug = Str::slug($slug, '-');
        $location->save();
        return response()->json(['message' => 'success',
            'values'=> $location], 201);
    }
    /**
     * @throws ValidationException
     */
    public function update(request $request, $id): JsonResponse
    {
        $location = Location::find($id);
//        if (!$location) {
//            return response()->json(['error' => 'Location not found'], 404);
//        }
        $this->validate($request, [
            'name' => 'required|unique:locations,name,' . $id,
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
        ]);
        $slug = $request->input('name');
        $location->name = $request->input('name');
        $location->lat = $request->input('lat');
        $location->slug = Str::slug($slug, '-');
        $location->lng = $request->input('lng');
        $location->save();
        return response()->json(['message' => 'success'], 201);
    }

    public function delete($id): JsonResponse
    {
        $location = Location::find($id);
//        if (!$location) {
//            return response()->json(['error' => 'Location not found'], 404);
//        }
        $location->delete();
        return response()->json(['message' => 'success'], 201);
    }

    //
}
