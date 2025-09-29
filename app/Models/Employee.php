<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'name',
        'department_id',
        'remark',
    ];

    protected $table = 'employees';

    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }
}


