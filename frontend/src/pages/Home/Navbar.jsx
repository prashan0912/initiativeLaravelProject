import { StoreContext } from '../../context/StoreContext'
import { useContext } from 'react';

export default function Navbar() {

    const contextValue = useContext(StoreContext);

    const { toggle, setToggle, isOpen, setIsOpen, isLogin, setIsLogin } = contextValue;

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

                            <div className="flex items-center gap-4 border-l pl-6 border-slate-200">
                                <button
                                    className="text-slate-100 font-semibold hover:text-gray-700 transition-all"
                                    onClick={() => setToggle(true)} // FIXED: Wrapped in arrow function
                                >
                                    Log in
                                </button>
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
