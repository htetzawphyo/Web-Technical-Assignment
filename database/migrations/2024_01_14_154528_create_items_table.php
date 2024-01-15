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
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('category_id')->nullable();
            $table->string('price')->nullable();
            $table->longText('description')->nullable();
            $table->enum('item_condition', ['new', 'used', 'second'])->nullable();
            $table->enum('item_type', ['for_sell', 'for_buy', 'for_exchange'])->nullable();
            $table->boolean('publish')->default(1);
            $table->string('image')->nullable();
            $table->string('owner_name')->nullable();
            $table->string('contact_number', '20')->nullable();
            $table->string('address')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
