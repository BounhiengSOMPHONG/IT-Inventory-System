<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'ProductName',
        'ProductModel',
        'Manufacturer',
        'ProductTypeId',
        'AssetCode',
        'SerialNumber',
        'ServiceTag',
        'HD',
        'RAM',
        'CPU',
        'Status',
        'AddedBy',
        'DateAdd',
        'YearBought',
    ];

    public function productType()
    {
        return $this->belongsTo(ProductType::class, 'ProductTypeId');
    }

    public function addedBy()
    {
        return $this->belongsTo(User::class, 'AddedBy');
    }
}
