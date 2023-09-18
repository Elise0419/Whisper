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
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id');
            $table->string('mem_name');
            $table->string('person_id');
            $table->string('pwd');
            $table->string('email')->unique();
            $table->string('headimg')->nullable();
            $table->string('phone');
            $table->dateTime('set_time');
            $table->dateTime('edit_time');
            $table->dateTime('login_time');
            $table->dateTime('logout_time');
            $table->timestamp('email_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};