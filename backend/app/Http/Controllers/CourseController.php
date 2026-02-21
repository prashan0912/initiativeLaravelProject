<?php

namespace App\Http\Controllers;


use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    //
    public function addcourse(Request $request)
    {
        $request->validate([
            'photo' => 'required|string',
            'title' => 'required|string',
            'teacher_name' => 'required|string',
            'teacher_info' => 'required|string',
            'rating' => 'required|numeric|between:0,5',
            'rating_count' => 'required|integer|min:0',
            'price' => 'required|numeric|min:0'
        ]);

        $course = Course::create($request->all());
        // Logic to save the course to the database would go here

        return response()->json([
            "result" => "success",
            "message" => "course added successfully"
        ], 201);
    }

    public function getcourses()
    {
        $course = Course::all();
        return response()->json([
            "result" => "success",
            "coursedata" => $course
        ], 200);
        // return "get courses";
    }

}
