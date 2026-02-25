
import universalCookie from 'universal-cookie';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from ".././context/StoreContext";
import { useContext } from "react";
const cookies = new universalCookie();

export default function ProtectedRoute({ children }) {

    console.log("ProtectedRoute");
    const [status, setStatus] = useState(null);

    const contextValue = useContext(StoreContext);
    const { token ,setProfileLoggedIn} = contextValue;


    console.log("Token from cookie:", token);

    async function sendTokenToBackend() {

        await axios.post("http://localhost:8000/api/profile", {}, // body empty
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("protectedRoute data:", response.data);
                setStatus(true); // Assuming the backend sends an 'authenticated' field in the response
                console.log(response.data.status)
                setProfileLoggedIn(true);
            })
            .catch((error) => {
                console.error("Error fetching profile:", error);
            });
    }
    useEffect(() => {
        if (token) {
            sendTokenToBackend();
        }
    }, []);


    if (status == null) {
        return <div>Loading...</div>
    } else if (status) {
        return children;
    }
    else {
        return <div>404 Result not Found</div>
    }
}