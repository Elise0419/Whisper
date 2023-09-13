<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ad>
 */
class AdFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $ftype = $this->faker->randomElement(['mkup', 'food', 'fashion', 'life', 'love']);
        return [
            'forum_type' => $ftype,
            'img_url' => $this->faker->imageUrl(),
            'url' => $this->faker->url(),
        ];
    }
}
