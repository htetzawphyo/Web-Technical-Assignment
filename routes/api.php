<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout']);
Route::middleware(['auth:sanctum'])->group(function() {

    Route::controller(ItemController::class)->group(function() {
        Route::get('/items', 'index');
        Route::post('/items', 'store');
        Route::get('/items/{item}', 'show');
        Route::put('/items/{item}', 'update');
        Route::patch('/items/{item}', 'publish');
        Route::delete('/items/{item}', 'delete');
    });

    Route::controller(CategoryController::class)->group(function() {
        Route::get('/category', 'index');
        Route::post('/category', 'store');
        Route::get('/category/{category}', 'show');
        Route::put('/category/{category}', 'update');
        Route::patch('/category/{category}', 'publish');
        Route::delete('/category/{category}', 'delete');
    });
});