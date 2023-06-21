<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NewsApiController;

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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});



Route::get('/news-all', [NewsApiController::class,'displayAllNews']);

//news api
Route::get('/news/news-api', [NewsApiController::class,'displayNewsApiProviderNews']);
Route::post('news/news-api/sourceId', [NewsApiController::class,'displayNews']);
//the guardian
Route::get('/news/the-guaridan', [NewsApiController::class,'displayTheGuardianProviderNews']);
//nytimes
Route::get('/news/nyTimes', [NewsApiController::class,'displayNYTimesProviderNews']);


