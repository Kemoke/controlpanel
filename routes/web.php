<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/
Route::group(['middleware' => ['web']], function (){
    Route::auth();
    Route::group(['middleware' => ['auth:web']], function (){
        Route::post('api/ftp/list', 'FtpController@listDir');
        Route::post('api/ftp/open', 'FtpController@openFile');
        Route::post('api/ftp/edit', 'FtpController@editFile');
        Route::post('api/ftp/delete', 'FtpController@deleteFile');
        Route::post('api/ftp/upload', 'FtpController@uploadFile');

        Route::resource('api/server', 'ServerController');

        Route::get('/api/gs/info', 'GameServerController@query');
        Route::post('api/gs/start', 'GameServerController@start');
        Route::post('/api/gs/stop', 'GameServerController@stop');

        Route::get('{any}', function () {
            return view('index');
        })->where('any', '.*');
    });
});