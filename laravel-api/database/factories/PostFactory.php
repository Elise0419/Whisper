<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $typesWithTags = [
            'mkup' => ['tag1', 'tag2', 'tag3', 'tag4'],
            'food' => ['tag5', 'tag6', 'tag7', 'tag8'],
            'life' => ['tag9', 'tag10', 'tag11', 'tag12'],
            'fashion' => ['tag13', 'tag14', 'tag15', 'tag16'],
            'love' => ['tag17', 'tag18', 'tag19', 'tag20'],
        ];
        $type = $this->faker->randomElement(array_keys($typesWithTags));
        $tags = $typesWithTags[$type];
        return [
            'user_id' => User::factory(),
            'title' => $this->faker->title(),
            'type' => $type,
            'content' => $this->faker->paragraph(),
            'img_url' => $this->faker->imageUrl(),
            'thumb' => $this->faker->numberBetween(0, 100),
            'save' => $this->faker->numberBetween(0, 50),
            'com_txt' => $this->faker->numberBetween(0, 5),
            'tag' => $this->faker->randomElement($tags),
            'post_time' => $this->faker->dateTimeThisMonth(),

        ];
    }
}
