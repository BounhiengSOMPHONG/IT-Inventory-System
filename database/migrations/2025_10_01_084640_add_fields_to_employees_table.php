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
        Schema::table('employees', function (Blueprint $table) {
            $table->string('employee_code')->unique()->after('id');
            $table->string('position')->after('name');
            $table->string('email')->after('position');
            $table->string('phone')->after('email');
            $table->enum('status', ['active', 'inactive', 'resigned'])->default('active')->after('phone');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employees', function (Blueprint $table) {
            $table->dropColumn('employee_code');
            $table->dropColumn('position');
            $table->dropColumn('email');
            $table->dropColumn('phone');
            $table->dropColumn('status');
        });
    }
};
