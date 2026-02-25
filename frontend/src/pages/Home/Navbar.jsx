import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react';
import Component1 from '../../Component/Component1';
import { useNavigate } from 'react-router-dom';
export default function Navbar() {

    const contextValue = useContext(StoreContext);

    const navigate = useNavigate();


    function oncartHandler() {
        navigate('/cart')
    }

    const { toggle, setToggle, isOpen, setIsOpen, isLogin, setIsLogin, profileLogedIn, cartQuantity } = contextValue;

    const navItems = ["Home", "Product", "Career", "About us"];

    return (
        <div>
            <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md shadow-sm z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <span className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                BRAND
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8">
                            <ul className="flex space-x-6 list-none">
                                {navItems.map((item, index) => (
                                    <li key={index}>
                                        <a href={`#${item.toLowerCase()}`} className="text-slate-600 hover:text-blue-600 font-medium transition-all">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            {/* login or logout or avatar */}
                            {profileLogedIn ? (<Component1 />) : (
                                <div className="flex items-center gap-4 border-l pl-6 border-slate-200">
                                    <button
                                        className="text-slate-100 font-semibold hover:text-gray-700 transition-all"
                                        onClick={() => setToggle(true)} // FIXED: Wrapped in arrow function
                                    >
                                        Log in
                                    </button>
                                </div>)}

                            
                                <div class="bg-white-100 flex justify-center items-center cursor-pointer" onClick={()=>oncartHandler()}>
                                    <div class="relative py-2">
                                        <div class="t-0 absolute left-3">
                                            <p class="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">{cartQuantity}</p>
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="file: mt-4 h-6 w-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                        </svg>
                                    </div>
                                </div>
                          
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 text-slate-600 text-2xl"
                            >
                                {isOpen ? '✕' : '☰'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                <div className={`md:hidden transition-all duration-300 bg-white border-t ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="px-6 py-4 space-y-4">
                        {navItems.map((item, index) => (
                            <a key={index} href="#" className="block text-slate-700 font-medium">{item}</a>
                        ))}
                        <button
                            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold"
                            onClick={() => { setToggle(true); setIsLogin(true) }}
                        >
                            SignIn
                        </button>
                        <button
                            className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold"
                            onClick={() => { setToggle(true); setIsLogin(false) }}
                        >
                            SignUp
                        </button>

                    </div>
                </div>
            </nav>
        </div>
    )
}
