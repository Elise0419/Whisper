<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Post::factory()
            ->count(1)
            ->hasComtxts(2)
            ->create();
        Post::factory()
            ->count(1)
            ->hasComtxts(2)
            ->create();
        Post::factory()
            ->count(1)
            ->hasComtxts(2)
            ->create();
    }
}
