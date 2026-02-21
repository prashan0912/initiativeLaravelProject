<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('course', function (Blueprint $table) {
            $table->id();
            $table->string('photo');               // image path/url
            $table->string('title');
            $table->string('teacher_name');
            $table->text('teacher_info');
            $table->decimal('rating', 3, 2);       // e.g. 4.5
            $table->integer('rating_count');       // no of ratings
            $table->decimal('price', 8, 2);        // e.g. 525.00
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course');
    }
};
