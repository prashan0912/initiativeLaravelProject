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
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id(); // AUTO_INCREMENT PRIMARY KEY

            $table->foreignId('user_id')
                  ->constrained('users')
                  ->onDelete('cascade');

            $table->foreignId('course_id')
                  ->constrained('courses')
                  ->onDelete('cascade');

            $table->timestamp('enrolled_at')->useCurrent();
            $table->integer('progress')->default(0);
            $table->boolean('completed')->default(false);

            $table->unique(['user_id', 'course_id']); // UNIQUE KEY
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrollments');
    }
};
