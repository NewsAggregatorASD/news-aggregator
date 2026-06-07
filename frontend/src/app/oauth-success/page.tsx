"use client";

import { useEffect } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function OAuthSuccess() {
  const router = useRouter();
  const searchParams =
    useSearchParams();

  useEffect(() => {
    const token =
      searchParams.get("token");

    if (token) {
      localStorage.setItem(
        "accessToken",
        token
      );

      router.replace("/home");
    } else {
      router.replace("/login");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Signing you in...
    </div>
  );
}