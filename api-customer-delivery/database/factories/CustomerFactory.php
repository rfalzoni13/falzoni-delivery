<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'lastname' => fake()->name(),
            'document' => fake()->sentence(14),
            'document' => fake()->email(),
            'phone_number' => fake()->phoneNumber(),
            'datebirth' => fake()->date(),
            'marital' => fake()->sentence(5)
        ];
    }
}
