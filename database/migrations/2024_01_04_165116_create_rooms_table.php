<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type');
            $table->integer('capacity');
            $table->string('location');
            // Za 'equipment' koristimo 'text' tip kako bismo mogli da sačuvamo JSON niz.
            $table->text('equipment')->nullable();
            $table->integer('squareFootage');
            $table->decimal('price', 8, 2); // Pretpostavljamo da 'price' može imati decimale, prilagodite preciznost po potrebi.
            $table->text('description')->nullable();
            $table->string('imageUrl')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rooms');
    }
};
