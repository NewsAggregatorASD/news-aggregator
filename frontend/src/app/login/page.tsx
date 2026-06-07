"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import toast from "react-hot-toast";

const LoginPage = () => {
    const router = useRouter();
    const { setIsLoggedIn, setUser } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", { email, password, });

            localStorage.setItem("accessToken", response.data.accessToken);
            setIsLoggedIn(true);
            toast.success(
                "Logged in successfully"
            );
            setUser({
                _id: response.data._id,
                username:
                    response.data.username,
                email: response.data.email,
            });

            router.push("/home");
        }
        catch (error: unknown) {
            const message = error instanceof Error ? error.message : (error as any)?.response?.data?.message || "Login failed";
            toast.error(message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin}
                className="bg-white p-8 rounded-xl shadow-md w-full max-w-md" >

                <h1 className="text-3xl font-bold mb-6 text-center text-black">Login</h1>

                <input type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-3 rounded-lg mb-4" />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-3 rounded-lg mb-4"
                />
                <button type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg">Login</button>
                <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
                    className="block text-center mt-4 border py-3 rounded-lg text-black">Continue with Google</a>
            </form >
        </div >
    );
};
export default LoginPage;



