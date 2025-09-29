<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Department;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Department::create(['department_name' => 'Information Technology']);
        Department::create(['department_name' => 'Human Resources']);
        Department::create(['department_name' => 'Finance']);
        Department::create(['department_name' => 'Marketing']);
        Department::create(['department_name' => 'Sales']);
    }
}
