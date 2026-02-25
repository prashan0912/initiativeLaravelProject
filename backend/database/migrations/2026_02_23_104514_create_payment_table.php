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
        Schema::create('payment', function (Blueprint $table) {
            $table->id(); // INT AUTO_INCREMENT PRIMARY KEY

            $table->foreignId('user_id')
                ->constrained('users')
                ->onDelete('cascade');

            $table->foreignId('course_id')
                ->constrained('courses')
                ->onDelete('cascade');

            $table->decimal('amount', 10, 2);

            $table->enum('status', ['pending', 'paid', 'failed'])
                ->default('pending');

            $table->string('payment_method', 100)->nullable();

            $table->timestamp('paid_at')->nullable();

            $table->timestamps(); // optional but recommended
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};
