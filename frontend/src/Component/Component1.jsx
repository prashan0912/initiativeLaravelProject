
import universalCookie from 'universal-cookie';
import { useContext } from "react";
import { StoreContext } from ".././context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';




export default function Component1() {
    const navigate = useNavigate();

    const cookies = new universalCookie();

    console.log("UserProfile component rendered");

    const contextValue = useContext(StoreContext);
    const { token, setProfileLoggedIn, profileLogedIn } = contextValue;

    console.log("Token in UserProfile:", token);

    async function logoutfunction(e) {

        setProfileLoggedIn(false);
        // e.preventDefault();


        await axios.post("http://localhost:8000/api/logout", {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log("Logout response:", response.data);
            if (response.data.success == true) {
                cookies.remove('token');
                toast.success("Logged out successfully");
                console.log("profileLoggedIn set to false" + profileLogedIn);

                // Redirect to home page after logout
            }
            // Handle successful logout, e.g., clear user data, redirect to login page, etc.
        }).catch((error) => {
            console.error("Logout error:", error);
            // Handle logout error, e.g., show an error message to the user.
        });

        navigate("/"); // Redirect to home page after logout
    }
    return (
        <div>
            <div className="flex items-center gap-4">
                <button
                    className="text-slate-100 font-semibold hover:text-gray-700 transition-all"
                    onClick={logoutfunction}
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
