import React, { use, useEffect, useState } from 'react'
import courseInfo from '../Utils/Utils'
import axios from 'axios';
export default function Main() {

    const [courses, setCourses] = useState([]);
    async function fetchCourseData() {
        try {
            const response = await axios.get("http://localhost:8000/api/getcourses");
            // setCourses(response.coursedata);
            console.log("response.data", response.data);
            setCourses(response.data.coursedata);
            console.log("Course data:", response.data.coursedata);
        } catch (error) {
            console.log("Error fetching course data:", error);
        }
    }
    useEffect(() => {
        fetchCourseData();
    }, []);



    return (
        <div>
            <main className="pt-32 text-center">
                <h1 className="text-5xl font-bold text-slate-800">Your App Content</h1>
                <p className="mt-4 text-slate-500">Click Log In to see the login in your self!</p>
                <div className="flex flex-wrap justify-center gap-8 px-6 py-10">
                    {Array.isArray(courses) && courses.map((course, index) => (
                        <div
                            key={index}
                            className="w-80 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Image */}
                            <img
                                src={course.photo}
                                alt="course"
                                className="h-44 w-full object-cover rounded-t-xl"
                            />

                            {/* Content */}
                            <div className="p-4">
                                {/* Title */}
                                <h2 className="text-lg font-semibold text-gray-900 leading-snug line-clamp-2">
                                    {course.title}
                                </h2>

                                {/* Instructor */}
                                <p className="text-sm text-gray-500 mt-1">
                                    {course.teacherName}
                                </p>


                                {/* Meta info */}
                                <div className="flex flex-wrap gap-2 mt-2 text-xs text-gray-500">

                                    <span className="border px-2 py-0.5 rounded-full">
                                        {course.rating}  ⭐ rating
                                    </span>
                                    <span className="border px-2 py-0.5 rounded-full">
                                        {course.rating_count} rating count
                                    </span>
                                    <span className="border px-2 py-0.5 rounded-full">
                                        {course.totalHours} 64 hours
                                    </span>
                                    <span className="border px-2 py-0.5 rounded-full">
                                        {course.lectures}100 lectures
                                    </span>
                                    <span className="border px-2 py-0.5 rounded-full">
                                        Beginner
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="flex items-center gap-2 mt-4">
                                    <span className="text-lg font-bold text-gray-900">
                                        {course.price}
                                    </span>
                                    <span className="text-sm text-gray-400 line-through">
                                        {course.oldPrice}
                                    </span>
                                </div>

                                {/* CTA */}
                                <button className='bg-indigo-600 text-white hover:bg-indigo-700'>Buy now</button>
                            </div>
                        </div>
                    ))}
                </div>


            </main>
        </div>
    )
}
