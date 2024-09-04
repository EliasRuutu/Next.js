<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


use App\Http\Controllers\ClassController;

Route::get('/reservar/{id}', [ClassController::class, 'show']);
Route::post('/reservar/seats', [ClassController::class, "saveSeat"])->name("api.sendSeat");