"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { BookMarked, Clock, Star, User, Mail } from "lucide-react";
import toast from "react-hot-toast";

const DashboardPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const isVerified = (user as any)?.isVerified;

  const [history, setHistory] = useState<any[]>([]);
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [digestSubscribed, setDigestSubscribed] = useState(true);
  const [digestLoading, setDigestLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [historyRes, bookmarksRes, dashboardRes] = await Promise.all([
          api.get("/users/history"),
          api.get("/users/bookmarks"),
          api.get("/users/dashboard"),
        ]);
        setHistory(historyRes.data.slice(0, 5));
        setBookmarks(bookmarksRes.data.slice(0, 4));
        // get digestSubscribed from dashboard API
        setDigestSubscribed(
          dashboardRes.data.stats?.digestSubscribed ?? true
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // toggle digest subscription
  const handleDigestToggle = async () => {
    try {
      setDigestLoading(true);
      if (digestSubscribed) {
        await api.patch("/users/digest/unsubscribe");
        setDigestSubscribed(false);
        toast.success("Unsubscribed from weekly digest");
      } else {
        await api.patch("/users/digest/subscribe");
        setDigestSubscribed(true);
        toast.success("Subscribed to weekly digest ✅");
      }
    } catch (error) {
      toast.error("Failed to update preference");
    } finally {
      setDigestLoading(false);
    }
  };

  const categoryCount = history.reduce((acc: any, item: any) => {
    const cat = item.category || "general";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const topInterests = Object.entries(categoryCount)
    .sort((a: any, b: any) => b[1] - a[1])
    .slice(0, 4);

  return (
    <ProtectedRoute>
      <div className="bg-black min-h-screen text-white">
        <Navbar />

        <div className="max-w-7xl mx-auto p-6">

          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-1">Dashboard</h1>
            <p className="text-zinc-500">Welcome back, {user?.username} 👋</p>
          </div>

          {loading ? (
            <div className="text-center py-24 text-zinc-500 animate-pulse">
              Loading your dashboard...
            </div>
          ) : (
            <>
              {/* STATS ROW */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                  <User className="w-5 h-5 text-blue-400 mb-3" />
                  <p className="text-zinc-500 text-xs mb-1">Username</p>
                  <p className="text-white font-semibold">{user?.username}</p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                  <BookMarked className="w-5 h-5 text-purple-400 mb-3" />
                  <p className="text-zinc-500 text-xs mb-1">Bookmarks</p>
                  <p className="text-white font-semibold text-2xl">{bookmarks.length}</p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                  <Clock className="w-5 h-5 text-green-400 mb-3" />
                  <p className="text-zinc-500 text-xs mb-1">Articles Read</p>
                  <p className="text-white font-semibold text-2xl">{history.length}</p>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                  <Star className="w-5 h-5 text-yellow-400 mb-3" />
                  <p className="text-zinc-500 text-xs mb-1">Account</p>
                  <p className={`font-semibold text-sm ${isVerified ? "text-green-400" : "text-yellow-400"}`}>
                    {isVerified ? "✓ Verified" : "⚠ Unverified"}
                  </p>
                </div>

              </div>

              {/* DIGEST TOGGLE CARD — full width */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-white font-semibold">Weekly Email Digest</p>
                      <p className="text-zinc-500 text-sm">
                        Top 5 trending articles every Monday at 8AM
                      </p>
                    </div>
                  </div>

                  {/* TOGGLE BUTTON */}
                  <button
                    onClick={handleDigestToggle}
                    disabled={digestLoading}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 disabled:opacity-50 ${
                      digestSubscribed ? "bg-blue-600" : "bg-zinc-700"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                        digestSubscribed ? "left-7" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                {/* STATUS TEXT */}
                <p className={`text-xs mt-3 ${digestSubscribed ? "text-green-400" : "text-zinc-500"}`}>
                  {digestSubscribed
                    ? "✓ You're subscribed — emails sent every Monday"
                    : "✗ Unsubscribed — you won't receive digest emails"}
                </p>
              </div>

              {/* MAIN GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* READING HISTORY */}
                <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold">Recent Reading</h2>
                    <Link href="/home" className="text-sm text-blue-400 hover:underline">
                      Browse more →
                    </Link>
                  </div>

                  {history.length === 0 ? (
                    <p className="text-zinc-500 text-sm">No reading history yet — start reading!</p>
                  ) : (
                    <div className="space-y-3">
                      {history.map((item: any, index: number) => (
                        <Link
                          key={index}
                          href={`/article/${item.article?._id}`}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-zinc-800 transition-colors group"
                        >
                          {item.article?.imageUrl ? (
                            <img
                              src={item.article.imageUrl}
                              alt=""
                              className="w-14 h-14 rounded-lg object-cover shrink-0"
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-lg bg-zinc-700 shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium line-clamp-2 group-hover:text-blue-400 transition-colors">
                              {item.article?.title}
                            </p>
                            <p className="text-zinc-500 text-xs mt-1 capitalize">
                              {item.category} · {new Date(item.viewedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* RIGHT COLUMN */}
                <div className="space-y-6">

                  {/* TOP INTERESTS */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <h2 className="text-lg font-bold mb-4">Top Interests</h2>
                    {topInterests.length === 0 ? (
                      <p className="text-zinc-500 text-sm">Read more articles to see your interests</p>
                    ) : (
                      <div className="space-y-3">
                        {topInterests.map(([cat, count]: any) => (
                          <div key={cat} className="flex items-center justify-between">
                            <span className="text-zinc-300 text-sm capitalize">{cat}</span>
                            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                              {count} articles
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* QUICK LINKS */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                    <h2 className="text-lg font-bold mb-4">Quick Links</h2>
                    <div className="space-y-2">
                      <Link href="/bookmarks" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors py-1">
                        <BookMarked className="w-4 h-4" /> My Bookmarks
                      </Link>
                      <Link href="/search" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors py-1">
                        🔍 Search Articles
                      </Link>
                      <Link href="/home" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors py-1">
                        🏠 Home Feed
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;