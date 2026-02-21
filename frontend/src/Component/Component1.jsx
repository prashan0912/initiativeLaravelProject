import React from 'react'

export default function Component1() {
    return (
        <div>
            <div className="flex items-center gap-4">
                <button
                    className="text-slate-100 font-semibold hover:text-gray-700 transition-all"
                >
                    Log out
                </button>

                <div
                    className="text-slate-100 ml-4 font-semibold rounded-full bg-slate-700 p-3 hover:text-gray-700 transition-all"
                >
                    user
                </div>
            </div>
        </div>
    )
}
