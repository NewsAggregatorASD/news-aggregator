"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import api from "@/services/api";
import toast from "react-hot-toast";
import Link from "next/link";

const LoginPage = () => {
  const router = useRouter();
  const { setIsLoggedIn, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/auth/login", { email, password });

      localStorage.setItem("accessToken", response.data.accessToken);
      setIsLoggedIn(true);
      setUser({
        _id: response.data._id,
        username: response.data.username,
        email: response.data.email,
      });

      toast.success("Logged in successfully");
      router.push("/home");
    } catch (error: any) {
      const message = error?.response?.data?.message || "Login failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-zinc-500 text-center text-sm mb-8">
          Login to your account
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-500 p-3 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-colors text-white py-3 rounded-xl font-medium"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Google OAuth */}
          <a
            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google`}
            className="block text-center border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white py-3 rounded-xl transition-colors"
          >
            Continue with Google
          </a>
        </form>

        <div className="flex items-center justify-between mt-6">
          <Link href="/register" className="text-blue-400 hover:underline text-sm mx-auto">
            Create account
          </Link>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;