
import axios from "axios"
import Navbar from "../pages/Home/Navbar"
import { StoreContext } from ".././context/StoreContext";
import { useContext } from "react";
import universalCookie from 'universal-cookie';
import { useNavigate } from "react-router-dom";
export default function UserProfile() {

    console.log("profile")
    const navigate = useNavigate();

    const cookies = new universalCookie();

    console.log("UserProfile component rendered");

    const contextValue = useContext(StoreContext);
    const { token } = contextValue;

    console.log("Token in UserProfile:", token);

    async function logoutfunction(e) {
        e.preventDefault();
        await axios.post("http://localhost:8000/api/logout", {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log("Logout response:", response.data);
            if (response.data.success == true) {
                cookies.remove('token'); // Clear token cookie on successful logout
            }
            // Handle successful logout, e.g., clear user data, redirect to login page, etc.
        }).catch((error) => {
            console.error("Logout error:", error);
            // Handle logout error, e.g., show an error message to the user.
        });

        navigate("/"); // Redirect to home page after logout
    }
    return (
        <>

            <Navbar />

            <button
                className="text-slate-100 font-semibold hover:text-gray-700 transition-all"
                onClick={(e) => logoutfunction(e)} // FIXED: Wrapped in arrow function
            >
                Log out
            </button>
        </>
    )
}
