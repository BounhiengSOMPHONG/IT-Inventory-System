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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('ProductName');
            $table->string('ProductModel');
            $table->string('Manufacturer');
            $table->foreignId('ProductTypeId')->constrained('product_types');
            $table->string('AssetCode')->unique();
            $table->string('SerialNumber')->unique();
            $table->string('ServiceTag')->unique();
            $table->string('HD');
            $table->string('RAM');
            $table->string('CPU');
            $table->string('Status');
            $table->foreignId('AddedBy')->constrained('users');
            $table->timestamp('DateAdd');
            $table->year('YearBought');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
