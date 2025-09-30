<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('login');
});


Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    
    // Department routes
    Route::resource('departments', DepartmentController::class);

    // Employee routes
    Route::resource('employees', EmployeeController::class);
    
    // Product type routes
    Route::resource('product-types', \App\Http\Controllers\ProductTypeController::class);

    // Status routes
    Route::resource('statuses', \App\Http\Controllers\StatusController::class);

    // Product routes
    Route::get('products/logs', [ProductController::class, 'logs'])->name('products.logs');
    Route::get('products/{product}/restore', [ProductController::class, 'restore'])->name('products.restore');
    Route::resource('products', ProductController::class);
});

require __DIR__.'/auth.php';
