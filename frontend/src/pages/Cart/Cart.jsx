
import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function Cart() {

    const [course, setCourses] = useState([]);

    async function fetchCourseData() {
        // try {
        //     const response = await axios.get("http://localhost:8000/api/getcart");
        //     // setCourses(response.coursedata);
        //     console.log("response.data", response.data);
        //     setCourses(response.data.coursedata);
        //     console.log("Course data:", response.data.coursedata);
        // } catch (error) {
        //     console.log("Error fetching course data:", error);
        // }

        try {

            let value = localStorage.getItem('cartItem');
            setCourses(JSON.parse(value))

        } catch (error) {
            console.log(error)
        }
    }

    function handleRemoveItem(cartid) {
        setCourses(prev => {
            const updatedCart = prev.filter(item => item.id !== cartid);
            localStorage.setItem("cartItem", JSON.stringify(updatedCart));
            return updatedCart;
        });
    }

    useEffect(() => {
        fetchCourseData();
    }, []);

    return (
        <div>
            <div className="min-h-screen bg-white p-10">
                <h1 className="text-4xl font-bold text-black mb-8">🛒 My Cart</h1>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {Array.isArray(course) && course.map((item, index) => (
                            <div
                                key={item.id}
                                className="bg-gray-200/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg flex gap-6 hover:scale-[1.02] transition-all duration-300"
                            >
                                <img
                                    src={item.photo}
                                    alt={item.title}
                                    className="w-40 h-32 object-cover rounded-xl"
                                />

                                <div className="flex flex-col justify-between flex-1">
                                    <div>
                                        <h2 className="text-xl font-semibold text-slate-800">
                                            {item.title}
                                        </h2>

                                        <p className="text-sm text-slate-800 mt-1">
                                            Instructor: {item.teacher_name}
                                        </p>

                                        <p className="text-sm text-slate-800 mt-1 line-clamp-2">
                                            {item.teacher_info}
                                        </p>

                                        {/* Rating */}
                                        <div className="flex items-center mt-2">
                                            <span className="text-yellow-400 font-semibold">
                                                ⭐ {item.rating}
                                            </span>
                                            <span className="text-slate-800 ml-2 text-sm">
                                                ({item.rating_count} ratings)
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-2xl font-bold text-black-400">
                                            Rs. {item.price}
                                        </span>

                                        <button
                                            onClick={() => handleRemoveItem(item.id)}
                                            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white transition-all"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="bg-slate-100/50 backdrop-blur-lg p-8 rounded-2xl shadow-lg h-fit sticky top-10">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">
                            Order Summary
                        </h2>

                        <div className="flex justify-between text-slate-800 mb-4">
                            <span>Items</span>
                            <span>{course.length}</span>
                        </div>

                        <div className="flex justify-between text-xl font-semibold text-slate-800 mb-6">
                            <span>Total</span>
                            {/* <span>${totalPrice.toFixed(2)}</span> */}
                        </div>

                        <button className="w-full bg-[#555bce] hover:opacity-90 py-3 rounded-xl text-white font-semibold transition-all"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}
