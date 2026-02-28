<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\FavoriteController;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    // Favorites management (AJAX JSON endpoints)
    Route::get('favorites', [FavoriteController::class, 'index'])->name('favorites.index');
    Route::post('favorites', [FavoriteController::class, 'store'])->name('favorites.store');
    Route::delete('favorites/{id}', [FavoriteController::class, 'destroy'])->name('favorites.destroy');

    // Inertia page for listing favorites
    Route::inertia('my-favorites', 'favorites')->name('favorites.page');

    // Movie detail page (Inertia) - client will fetch full details from the movie-detail endpoint
    Route::get('movies/{id}', function (Request $request, $id) {
        return Inertia::render('movies/show', ['id' => $id]);
    })->name('movies.show');
});

// Search movies (used by frontend infinite scroll) - supports `q` and `page`
Route::get('/search-movie', function (Request $request) {
    $query = $request->query('q');
    $page = $request->query('page', 1);

    $response = Http::get('https://www.omdbapi.com/', [
        'apikey' => env('OMDB_API_KEY'),
        's' => $query,
        'page' => $page,
    ]);

    return $response->json();
});

Route::get('/migrate-db', function () {
    try {
        \Illuminate\Support\Facades\Artisan::call('migrate', ['--force' => true]);
        return 'Yesss! Migrasi database berhasil! Tabel sudah dibuat.';
    } catch (\Exception $e) {
        return 'Error: ' . $e->getMessage();
    }
});

// Movie detail JSON endpoint (client-side will fetch this)
Route::get('/movie-detail', function (Request $request) {
    $id = $request->query('id');

    $response = Http::get('https://www.omdbapi.com/', [
        'apikey' => env('OMDB_API_KEY'),
        'i' => $id,
        'plot' => 'full',
    ]);

    return $response->json();
});

require __DIR__ . '/settings.php';
