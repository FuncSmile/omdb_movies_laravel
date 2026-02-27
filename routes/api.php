<?php

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;

Route::get('/search-movie', function (Illuminate\Http\Request $request) {

    $query = $request->query('q');

    $response = Http::get('https://www.omdbapi.com/', [
        'apikey' => env('OMDB_API_KEY'),
        's' => $query,
    ]);

    return $response->json();
});

?>