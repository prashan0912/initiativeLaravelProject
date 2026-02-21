import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import Navbar from './Home/Navbar';
import LoginForm from './Home/LoginForm';
import Main from './Home/Main';
export default function Home() {
    const contextValue = useContext(StoreContext);
    const { toggle } = contextValue;

    console.log("Home");
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            {toggle && (
                <LoginForm />
            )}
            <Main />
        </div>
    );
}