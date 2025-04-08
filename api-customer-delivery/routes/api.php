<?php

use App\Http\Controllers\Api\CustomerController;
use Illuminate\Support\Facades\Route;

Route::prefix('customer')->controller(CustomerController::class)->group(function() {
    Route::get('/', 'getAll');
    Route::get('/{id}', 'get');
    Route::post('/', 'create');
    Route::put('/', 'update');
    Route::delete('/{id}', 'delete');
});