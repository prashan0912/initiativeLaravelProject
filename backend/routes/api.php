<?php

use App\Http\Controllers\cartController;
use App\Http\Controllers\CourseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;


Route::post("/register", [UserController::class, "register"]);

Route::post("/login", [UserController::class, "login"]);

Route::group(["middleware" => "auth:sanctum"], function () {
    Route::post('/profile', [UserController::class, "profile"]);
    Route::post( "/logout", [UserController::class, "logout"]);
});


Route::get("/getcourses", [CourseController::class, "getcourses"]);

Route::post("/addcourse", [CourseController::class, "addcourse"]);

Route::post("/searchCourse", [CourseController::class, "searchCourse"]);

Route ::post("/getcart",[cartController::class,"getCart"]);