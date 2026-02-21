import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


export default function RegistrationForm() {

    console.log("RegistrationForm");
    const contextValue = useContext(StoreContext);
    const { isLogin , setToken } = contextValue;
    const navigate = useNavigate();
    const notify = (e) => toast('Here is your toast.' + e);
    const notify1 = () => toast('Register successfully! Please log in to continue.');


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //registration form submit function
    async function triggerRegistrationApi(name, email, password, e) {
        e.preventDefault();
        const data = {
            name: name,
            email: email,
            password: password
        };

        await axios.post("http://localhost:8000/api/register", data).then((response) => {

            console.log("Full response:", response);
            console.log("Backend data:", response.data);

            //  backend se aaya data
            notify1();
            // alert(response.data.message);
            // console.log("User name:", response.data.userName);

            // reset fields (sirf success par)
            setEmail("");
            setName("");
            setPassword("");
            alert(response.data.message);

        })
            .catch((error) => {
                if (error.response) {
                    console.log("Validation error:", error.response.data);
                    alert(error.response.data.message);
                } else {
                    console.log("Network error:", error.message);
                }
            });
    }

    const [verifyEmail, setVerifyEmail] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
   
    async function triggerLoginApi(verifyEmail, verifyPassword, e) {
        e.preventDefault();
        const data = {
            email: verifyEmail,
            password: verifyPassword
        };


        await axios.post("http://localhost:8000/api/login", data, { withCredentials: true }).then((response) => {

            // console.log("Full response:", response);
            // console.log("Backend data:", response.data);

            //  backend se aaya data
            notify(response.data.message);

            console.log("token:", response.data.token);
            setToken(response.data.token)
            console.log( response.data); // Check token value after login
            console.log("User name:", response.data.user.name);
            
            setVerifyEmail("");
            setVerifyPassword("");
        })
            .catch((error) => {
                if (error.response) {
                    console.log("Validation error:", error.response.data);
                    alert(error.response.data.message);
                } else {
                    console.log("Network error:", error.message);
                }
            });

        navigate("/profile");
    }


    return (
        <div>
            {!isLogin ? (<form className="space-y-4" onSubmit={(e) => triggerRegistrationApi(name, email, password, e)}>

                <div className="animate-fade-in">
                    <label className="text-sm font-semibold text-slate-600">Full Name</label>
                    <input type="text"
                        className="w-full mt-1 px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Enter your name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </div>

                <div>
                    <label className="text-sm font-semibold text-slate-600">Email</label>
                    <input
                        type="email"
                        className="w-full mt-1 px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="name@company.com"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>
                <div>
                    <label className="text-sm font-semibold text-slate-600">Password</label>
                    <input type="password"
                        className="w-full mt-1 px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="••••••••"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all mt-4 shadow-lg active:scale-95">
                    Create Account
                </button>
            </form>)

                : (<form className="space-y-4" onSubmit={(e) => triggerLoginApi(verifyEmail, verifyPassword, e)}>


                    <div>
                        <label className="text-sm font-semibold text-slate-600">Email</label>
                        <input
                            type="email"
                            className="w-full mt-1 px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="name@company.com"
                            onChange={(e) => setVerifyEmail(e.target.value)}
                            value={verifyEmail}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-semibold text-slate-600">Password</label>
                        <input type="password"
                            className="w-full mt-1 px-4 py-3 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                            placeholder="••••••••"
                            onChange={(e) => setVerifyPassword(e.target.value)}
                            value={verifyPassword}
                        />
                    </div>

                    <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-all mt-4 shadow-lg active:scale-95">
                        Sign In
                    </button>
                </form>)}
        </div>
    )
}
