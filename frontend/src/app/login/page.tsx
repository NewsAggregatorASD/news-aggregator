"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import api from "@/services/api";

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", { email, password, });

            localStorage.setItem("accessToken", response.data.accessToken);
            router.push("/home");
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <div className = "min-h-screen flex items-center justify-center bg-gray-100">
    <form onSubmit = { handleLogin }
    className = "bg-white p-8 rounded-xl shadow-md w-full max-w-md" >

    <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

    <input type="email"
    placeholder="Email"
    value={email}
    onChange={(e)=> setEmail(e.target.value)}
    className="w-full border p-3 rounded-lg mb-4"/>

     <input 
     type="password"
     placeholder="Password"
     value={password}
     onChange={(e)=>setPassword(e.target.value)}
     className="w-full border p-3 rounded-lg mb-4"
     />
    <button type="submit"
    className="w-full bg-black text-white py-3 rounded-lg">Login</button>
    <a href="http://localhost:5000/api/auth/google"
    className="block text-center mt-4 border py-3 rounded-lg">Continue with Google</a>
    </form >
    </div >
    );
};
export default LoginPage;



