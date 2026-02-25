import React, { createContext, use } from 'react'

import { useState } from 'react'

import Cookies from 'universal-cookie';

export const StoreContext = createContext(null);

import universalCookie from 'universal-cookie';


function StoreContextProvider(props) {

    console.log("StoreContextProvider component rendered");
    const cookies = new universalCookie();

    const [toggle, setToggle] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [cartQuantity , setCartQuantity] = useState(0) 

    const [profileLogedIn, setProfileLoggedIn] = useState(false);

    const [token, setToken] = useState(cookies.get('token') || null); // Initialize token state with cookie value or null
    

    console.log(token)

    const contextValue = {
        
        toggle,
        setToggle,
        isOpen,
        setIsOpen,
        isLogin, setIsLogin,
        token , setToken,
        profileLogedIn, setProfileLoggedIn,
        cartQuantity , setCartQuantity
        
    }


    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;
