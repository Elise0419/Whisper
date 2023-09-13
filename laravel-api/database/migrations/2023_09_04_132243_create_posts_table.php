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
        Schema::create('posts', function (Blueprint $table) {
            $table->id('post_id');
            $table->integer('user_id');
            $table->foreign('user_id', 'custom_foreign_key_name')->references('user_id')->on('users');
            $table->string('type');
            $table->string('title');
            $table->longText('content')->nullable();
            $table->string('imgurl')->nullable();
            $table->integer('thumb');
            $table->integer('save');
            $table->integer('comtxt');
            $table->string('tag'); //each topic has 4 kind of tags, pick one to show
            $table->dateTime('post_time');
            $table->timestamps();
        });
        //mutually exclusive
        Schema::table('posts', function (Blueprint $table) {
            $table->unique(['content', 'img_url']);
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
