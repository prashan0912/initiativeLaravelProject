import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";

import RegistrationForm from "./RegistrationForm";
export default function LoginForm() {
    console.log("LoginForm");

    const contextValue = useContext(StoreContext);


    const { setToggle, setIsLogin, isLogin } = contextValue;
    return (

        <div>
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
                {/* Close Modal Click-outside area */}
                <div className="absolute inset-0" onClick={() => setToggle(false)}></div>

                {/* Main Card */}
                <div className="relative bg-white rounded-[2rem] shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row min-h-[550px] animate-in fade-in zoom-in duration-300">

                    {/* Close Button for Modal */}
                    <button
                        onClick={() => setToggle(false)}
                        className="absolute top-4 right-6 text-slate-100 hover:text-slate-800 z-10 text-2xl"
                    >
                        ✕
                    </button>

                    {/* Left Side: Aesthetic Visual */}
                    <div className={`hidden md:flex md:w-1/2 p-12 flex-col justify-center text-white transition-all duration-700 ${isLogin ? 'bg-blue-600' : 'bg-indigo-600'}`}>
                        <h2 className="text-4xl font-bold mb-4">
                            {isLogin ? "Welcome Back!" : "Join Us!"}
                        </h2>
                        <p className="text-blue-100 mb-8">
                            {isLogin ? "Keep connected with us by logging in." : "Start your journey with a few simple steps."}
                        </p>
                        <button1
                            onClick={() => setIsLogin(!isLogin)}
                            className="border-2 border-blue-100 text-slate-800  px-8 py-2 rounded-sm bg-white font-bold flex justify-center items-center hover: hover:text-gray-800 transition-all active:scale-95 cursor-pointer bg-blue-200"
                        >
                            {isLogin ? "GO TO REGISTER" : "GO TO LOGIN"}
                        </button1>
                    </div>

                    {/* Right Side: Form */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                        <h2 className="text-3xl font-bold text-slate-800 mb-6">
                            {isLogin ? "Sign In" : "Sign Up"}
                        </h2>

                        <RegistrationForm />
                    </div>
                </div>
            </div>

        </div>
    )
}
