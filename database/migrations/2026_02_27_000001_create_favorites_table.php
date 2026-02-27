<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('favorites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('imdb_id')->index();
            $table->string('title');
            $table->string('poster')->nullable();
            $table->string('type')->nullable();
            $table->string('year')->nullable();
            $table->json('meta')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'imdb_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('favorites');
    }
};
