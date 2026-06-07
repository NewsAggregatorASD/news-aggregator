"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import api from "@/services/api";

interface User {
  _id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  isLoggedIn: boolean;

  user: User | null;

  loading: boolean;

  setIsLoggedIn: (
    value: boolean
  ) => void;

  setUser: (
    user: User | null
  ) => void;
}

const AuthContext =
  createContext<AuthContextType>({
    isLoggedIn: false,

    user: null,

    loading: true,

    setIsLoggedIn: () => { },

    setUser: () => { },
  });

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const initializeAuth =
      async () => {
        try {
          const token =
            localStorage.getItem(
              "accessToken"
            );

            console.log(
            "Stored token:",
            localStorage.getItem(
              "accessToken"
            )
          );

          if (!token) {
            setLoading(false);

            return;
          }

          // validate token
          const response =
            await api.get(
              "/auth/me"
            );

          setUser(response.data);

          setIsLoggedIn(true);
        } catch (error: any) {
          console.log(
            "Failed URL:",
            error.config?.url
          );

          console.log(
            "Status:",
            error.response?.status
          );

          console.error(error);

          localStorage.removeItem(
            "accessToken"
          );

          setUser(null);
          setIsLoggedIn(false);
        } finally {
          setLoading(false);
        }
      };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,

        user,

        loading,

        setIsLoggedIn,

        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext);