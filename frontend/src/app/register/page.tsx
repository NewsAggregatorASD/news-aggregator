"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import api from "@/services/api";

const RegisterPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post("/auth/register", { username, email, password, });
            toast.success("Registered successfully, please login");
            router.push("/login");
        }
        catch (error) {
            toast.error("Registration failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleRegister}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center text-black">Register</h1>
                <input type="text" placeholder="Username" value={username}
                    onChange={(e) =>
                        setUsername(e.target.value)
                    }
                    className="w-full border p-3 rounded-lg mb-4" />

                <input type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-3 rounded-lg mb-4"/>
                
                <input type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border p-3 rounded-lg mb-6"/>
                <button type="submit"className="w-full bg-black text-white py-3 rounded-lg">Register</button>
                </form>
                </div>);
};
export default RegisterPage;
