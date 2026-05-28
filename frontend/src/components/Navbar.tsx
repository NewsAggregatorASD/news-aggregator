"use client";

import Link from "next/link";

import {
  Newspaper,
  Search,
  Bookmark,
  LogOut,
  Menu,
  LogIn,
  UserPlus
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { useRouter }
  from "next/navigation";

import api from "@/services/api";

import { useAuth }
  from "@/context/AuthContext";

const Navbar = () => {
  const router = useRouter();

  const {
    isLoggedIn,
    user,
    setIsLoggedIn,
    setUser,
  } = useAuth();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");

      localStorage.removeItem(
        "accessToken"
      );

      setUser(null);

      setIsLoggedIn(false);

      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-black/70 backdrop-blur-xl">
      <nav className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* LOGO */}
        <Link
          href="/home"
          className="flex items-center gap-3"
        >
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <Newspaper className="w-5 h-5 text-blue-400" />
          </div>

          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-white">
              News Aggregator
            </h1>

            <p className="hidden sm:block text-xs text-zinc-500">
              Personalized Intelligence
            </p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/search"
            className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
          >
            <Search className="w-4 h-4" />
            Search
          </Link>

          {isLoggedIn && (
            <Link
              href="/bookmarks"
              className="flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
            >
              <Bookmark className="w-4 h-4" />
              Bookmarks
            </Link>
          )}

          {!isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-zinc-300 hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="bg-blue-500 hover:bg-blue-600 transition-colors px-4 py-2 rounded-xl text-white font-medium"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-400">
                {user?.username}
              </span>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-700 hover:border-zinc-500 transition-all text-zinc-300 hover:text-white"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button 
            className="p-2 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-700"
            aria-label="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </SheetTrigger>

        <SheetContent 
          side="right" 
          className="bg-black border-zinc-900 text-white flex flex-col justify-between p-6 w-75 sm:w-87.5"
        >
          {/* Top Section: Header & Main Nav */}
          <div className="flex flex-col h-full">
            <SheetHeader className="text-left pb-4 border-b border-zinc-950">
              <SheetTitle className="text-zinc-200 text-lg font-medium tracking-tight">
                Navigation
              </SheetTitle>
            </SheetHeader>

            <nav className="flex flex-col gap-2 mt-6">
              <SheetClose asChild>
                <Link
                  href="/search"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-all font-medium text-base"
                >
                  <Search className="w-5 h-5 opacity-70" />
                  Search
                </Link>
              </SheetClose>

              {isLoggedIn && (
                <SheetClose asChild>
                  <Link
                    href="/bookmarks"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition-all font-medium text-base"
                  >
                    <Bookmark className="w-5 h-5 opacity-70" />
                    Bookmarks
                  </Link>
                </SheetClose>
              )}
            </nav>
          </div>

          {/* Bottom Section: Auth Actions */}
          <div className="pt-4 border-t border-zinc-900 mt-auto">
            {!isLoggedIn ? (
              <div className="flex flex-col gap-2">
                <SheetClose asChild>
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors font-medium text-sm"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/register"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-white text-black hover:bg-zinc-200 transition-colors font-medium text-sm"
                  >
                    <UserPlus className="w-4 h-4" />
                    Create Account
                  </Link>
                </SheetClose>
              </div>
            ) : (
              <SheetClose asChild>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/20 transition-all font-medium text-base text-left"
                >
                  <LogOut className="w-5 h-5 opacity-80" />
                  Log Out
                </button>
              </SheetClose>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
      </nav>
    </header>
  );
};

export default Navbar;