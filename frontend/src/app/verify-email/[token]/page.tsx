"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/services/api";

const VerifyEmailPage = () => {
  const params = useParams();
  const token = params?.token as string;
  const router = useRouter();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await api.get(`/auth/verify-email/${token}`);
        setStatus("success");
        setMessage(response.data.message);
        setTimeout(() => router.push("/login"), 3000);
      } catch (error: any) {
        setStatus("error");
        setMessage(
          error.response?.data?.message || "Verification failed"
        );
      }
    };

    if (token) verify();
  }, [token]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 max-w-md w-full text-center">

        {status === "loading" && (
          <>
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
            <h2 className="text-white text-2xl font-bold mb-2">Verifying your email...</h2>
            <p className="text-zinc-500">Please wait a moment</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-green-400 text-3xl">✓</span>
            </div>
            <h2 className="text-white text-2xl font-bold mb-2">Email Verified!</h2>
            <p className="text-zinc-400 mb-6">{message}</p>
            <p className="text-zinc-500 text-sm">Redirecting to login in 3 seconds...</p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-red-400 text-3xl">✕</span>
            </div>
            <h2 className="text-white text-2xl font-bold mb-2">Verification Failed</h2>
            <p className="text-zinc-400 mb-6">{message}</p>
            <button
              onClick={() => router.push("/login")}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl text-white font-medium"
            >
              Go to Login
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default VerifyEmailPage;