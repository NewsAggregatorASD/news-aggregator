"use client";

import { useEffect, useState } from "react";
import api from "@/services/api";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import ArticleCard from "@/components/ArticleCard";
import toast from "react-hot-toast";
import { Bookmark } from "lucide-react";

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await api.get("/users/bookmarks");
        setBookmarks(response.data);
      } catch (error) {
        toast.error("Failed to fetch bookmarks");
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);

  return (
    <ProtectedRoute>
      <div className="bg-black min-h-screen text-white">
        <Navbar />

        <div className="max-w-7xl mx-auto p-6">

          {/* HEADER */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-1">
              <Bookmark className="w-6 h-6 text-blue-400" />
              <h1 className="text-4xl font-bold">Bookmarks</h1>
            </div>
            <p className="text-zinc-500">
              {bookmarks.length > 0
                ? `${bookmarks.length} saved article${bookmarks.length > 1 ? "s" : ""}`
                : "Your saved articles will appear here"}
            </p>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="text-center py-24 text-zinc-500 animate-pulse">
              Loading your bookmarks...
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && bookmarks.length === 0 && (
            <div className="text-center py-32">
              <p className="text-6xl mb-4">🔖</p>
              <h2 className="text-2xl font-semibold mb-2">No bookmarks yet</h2>
              <p className="text-zinc-500 mb-6">
                Save articles while browsing and they'll show up here
              </p>
              <a
                href="/home"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 transition-colors rounded-xl text-white font-medium"
              >
                Browse Articles
              </a>
            </div>
          )}

          {/* GRID */}
          {!loading && bookmarks.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {bookmarks.map((article: any) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          )}

        </div>
      </div>
    </ProtectedRoute>
  );
};

export default BookmarksPage;