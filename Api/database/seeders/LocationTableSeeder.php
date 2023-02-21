<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class LocationTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $slug = Str::slug('City loc', '-');
        Location::create(['name' => 'Paris', 'slug' => $slug, 'lat'=>'12.5', 'lng'=>'12.5']);
        Location::create(['name' => 'Lyon', 'slug' => $slug, 'lat'=>'142.5', 'lng'=>'142.5']);
    }
}
