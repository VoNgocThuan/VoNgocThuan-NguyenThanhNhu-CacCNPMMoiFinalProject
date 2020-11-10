<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('categories', 'API\CategoriesController');
Route::apiResource('books', 'API\BooksController');

Route::get('auth/create-token', 'API\Auth\AuthAPIController@createToken');

Route::post('auth/login', 'API\Auth\AuthAPIController@login');
Route::post('auth/register', 'API\Auth\AuthAPIController@register');

Route::group(["middleware" => 'auth:api'], function () {
    // shopping cart routes
    Route::post('addtocart', 'ShoppingCartController@add_to_cart');
    Route::delete('removefromcart/{product_id}', 'ShoppingCartController@remove_from_cart');
    Route::get('getusercart', 'ShoppingCartController@get_user_cart');
    // // wishlist routes
    // Route::get('getuserwishlist', 'WishlistController@get_user_wishlist');
    // Route::post('addtowishlist', 'WishlistController@add_to_wishlist');
    // Route::delete('removefromwishlist/{product_id}', 'WishlistController@remove_from_wishlist');
    // Route::post('wishlistcart', 'WishlistController@wishlist_to_cart');
    // // checkout routes
    // Route::get('checkoutinformation', 'OrderController@get_checkout_user_information');
    // // user order routes
    // Route::get('userorders', 'OrderController@get_user_orders');
    // Route::get('order/{order_id}', 'OrderController@order_detail');
    // // validate promo code
    // Route::post('validatepromo', 'OrderController@validate_promo_api');
});