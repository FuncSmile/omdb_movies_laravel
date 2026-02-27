<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $favorites = Favorite::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($favorites);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $data = $request->validate([
            'imdbID' => 'required|string',
            'Title' => 'required|string',
            'Poster' => 'nullable|string',
            'Year' => 'nullable|string',
            'Type' => 'nullable|string',
            'meta' => 'nullable',
        ]);

        // Prevent duplicate per user
        $favorite = Favorite::firstOrCreate([
            'user_id' => $user->id,
            'imdb_id' => $data['imdbID'],
        ], [
            'title' => $data['Title'],
            'poster' => $data['Poster'] ?? null,
            'type' => $data['Type'] ?? null,
            'year' => $data['Year'] ?? null,
            'meta' => $data['meta'] ?? null,
        ]);

        return response()->json($favorite, 201);
    }

    public function destroy(Request $request, $id)
    {
        $user = $request->user();

        $favorite = Favorite::where('id', $id)->where('user_id', $user->id)->firstOrFail();

        $favorite->delete();

        return response()->json(['deleted' => true]);
    }
}
