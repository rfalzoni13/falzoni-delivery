<?php

namespace Database\Seeders;

use App\Models\Customer;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Customer::factory(10)->create();

        Customer::factory()->create([
            'name' => 'Renato',
            'lastname' => 'Falzoni',
            'document' => '123.456.789-00',
            'email' => 'renato.lopes.falzoni@gmail.com',
            'datebirth' => date_create('1990-03-13'),
            'phone_number' => '(11) 92222-3333',
            'marital' => 'casado'
        ]);
    }
}
