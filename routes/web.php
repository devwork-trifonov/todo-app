<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::post('/user', function () {
    return Auth::user();
});

Route::middleware(['throttle:10'])->group(function () {
    Route::post('todos/create', 'TodoController@create');
    Route::post('notes/create', 'NoteController@create');
});

Route::post('/todos', 'TodoController@index');
Route::post('/todos/setBody', 'TodoController@setBody');
Route::post('/todos/complete', 'TodoController@complete');
Route::post('/todos/restore', 'TodoController@restore');
Route::post('/todos/delete', 'TodoController@delete');

Route::post('/notes', 'NoteController@index');
Route::post('/notes/setNoteBody', 'NoteController@setBody');
Route::post('/notes/delete', 'NoteController@delete');

Route::put('account/update-password', 'ProfileController@updateUserPassword');
Route::put('account/update-photo', 'UserAvatarController@update');
Route::post('account/delete', 'ProfileController@delete');

Auth::routes();


Route::get('{all?}', function () {
    return view('index');
})->where(['all' => '.*']);