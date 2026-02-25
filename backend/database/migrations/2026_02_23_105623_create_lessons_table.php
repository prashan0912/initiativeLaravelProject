<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('lessons', function (Blueprint $table) {
            $table->id(); // INT PRIMARY KEY AUTO_INCREMENT

            $table->foreignId('course_id')
                ->constrained('courses')
                ->onDelete('cascade'); // FOREIGN KEY

            $table->string('title');
            $table->string('video_url', 500)->nullable();
            $table->integer('order_num');
            $table->integer('duration')->nullable();

            $table->timestamps(); // created_at & updated_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
