"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";
import Navbar from "@/components/Navbar";
import FeedSection from "@/components/FeedSection";
import { Search } from "lucide-react";

const categories = [
  { label: "🌐 All", value: "" },
  { label: "💻 Tech", value: "technology" },
  { label: "⚽ Sports", value: "sports" },
  { label: "📈 Business", value: "business" },
  { label: "🏥 Health", value: "health" },
  { label: "🔬 Science", value: "science" },
  { label: "🎬 Entertainment", value: "entertainment" },
];

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchArticles = async () => {
    try {
      setLoading(true);
      const response = await api.get("/articles/search", {
        params: { q: query, category },
      });
      setArticles(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() || category) {
        searchArticles();
      } else {
        setArticles([]);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query, category]);

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        {/* HEADER */}
        <h1 className="text-4xl font-bold mb-1">Search Articles</h1>
        <p className="text-zinc-500 mb-8">Find stories across thousands of sources</p>

        {/* SEARCH INPUT */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-zinc-900 text-white border border-zinc-700 pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* CATEGORY PILLS */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                ${category === cat.value
                  ? "bg-white text-black scale-105"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="text-center py-16 text-zinc-500 animate-pulse">
            Searching...
          </div>
        )}

        {/* RESULT COUNT */}
        {!loading && articles.length > 0 && (
          <p className="text-zinc-500 text-sm mb-4">
            {articles.length} results {query && `for "${query}"`}
          </p>
        )}

        {/* RESULTS */}
        {!loading && articles.length > 0 && (
          <FeedSection title="Results" articles={articles} />
        )}

        {/* NO RESULTS */}
        {!loading && articles.length === 0 && (query || category) && (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🔍</p>
            <h2 className="text-2xl font-semibold mb-2">No results found</h2>
            <p className="text-zinc-500">Try a different keyword or category</p>
          </div>
        )}

        {/* DEFAULT STATE */}
        {!loading && !query && !category && (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">📰</p>
            <p className="text-zinc-500 text-lg">Start typing to discover articles</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;