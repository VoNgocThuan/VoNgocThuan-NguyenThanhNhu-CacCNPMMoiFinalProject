<?php

use Illuminate\Support\Facades\Route;

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

Route::get('/', function(){
    return view('welcome');
});

// Route::get('/{path?}', function () {
//     return view('layouts.app');
// });
// Route::get('/{path?}/{path2?}', function () {
//     return view('layouts.app');
// });
// Route::get('/{path?}/{path2?}/{path3?}', function () {
//     return view('layouts.app');
// });
// Route::get('/{path?}/{path2?}/{path3?}/{path4?}', function () {
//     return view('layouts.app');
// });


// Shopping Cart
Route::post('add', 'cartController@add');

Route::get('cart', function(){
    return Cart::getContent();
});

Route::get('clear', function(){
    $clear = Cart::clear();
    if($clear){
        return Cart::getContent();
    }
});

Auth::routes();
Route::get('/home', 'HomeController@index')->name('home');