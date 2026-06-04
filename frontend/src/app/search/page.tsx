"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";
import Navbar from "@/components/Navbar";
import { Search } from "lucide-react";
import SearchResults from "@/components/SearchResults";

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
  const [source, setSource] =
    useState<string>("");
  const [sources, setSources] = useState<string[]>([]);
  const [suggestions, setSuggestions] =
    useState<string[]>([]);

  const [
    showSuggestions,
    setShowSuggestions,
  ] = useState(false);
  const [recentSearches, setRecentSearches] =
    useState<string[]>([]);
  const [sort, setSort] =
    useState("relevant");

  const searchArticles = async () => {
    try {
      setLoading(true);
      const response =
        await api.get(
          "/articles/search",
          {
            params: {
              q: query,
              category,
              source,
              sort,
            },
          }
        );
      setArticles(response.data.articles);
      if (query.trim()) {
        saveSearch(query);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveSearch = (
    searchTerm: string
  ) => {
    if (!searchTerm.trim())
      return;

    const updated = [
      searchTerm,

      ...recentSearches.filter(
        (item) =>
          item.toLowerCase() !==
          searchTerm.toLowerCase()
      ),
    ].slice(0, 5);

    setRecentSearches(updated);

    localStorage.setItem(
      "recentSearches",
      JSON.stringify(updated)
    );
  };

  useEffect(() => {
    const fetchSources =
      async () => {
        try {
          const response =
            await api.get(
              "/articles/sources"
            );

          setSources(
            response.data
          );
        } catch (error) {
          console.error(error);
        }
      };

    fetchSources();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() || category) {
        searchArticles();
      } else {
        setArticles([]);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [query, category, source, sort]);

  useEffect(() => {
    const saved =
      localStorage.getItem(
        "recentSearches"
      );

    if (saved) {
      setRecentSearches(
        JSON.parse(saved)
      );
    }
  }, []);

  useEffect(() => {
    const fetchSuggestions =
      async () => {
        if (
          query.trim().length < 2
        ) {
          setSuggestions([]);
          return;
        }

        try {
          const response =
            await api.get(
              "/articles/suggestions",
              {
                params: {
                  q: query,
                },
              }
            );

          setSuggestions(
            response.data
          );
        } catch (error) {
          console.error(error);
        }
      };

    const timer =
      setTimeout(
        fetchSuggestions,
        250
      );

    return () =>
      clearTimeout(timer);
  }, [query]);

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
            onFocus={() =>
              setShowSuggestions(true)
            }
            onBlur={() =>
              setTimeout(
                () =>
                  setShowSuggestions(
                    false
                  ),
                200
              )
            }
            onChange={(e) =>
              setQuery(
                e.target.value
              )
            }
            className="w-full bg-zinc-900 text-white border border-zinc-700 pl-12 pr-4 py-4 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
          />
          {showSuggestions &&
            suggestions.length > 0 && (
              <div
                className="
        absolute
        top-full
        left-0
        right-0
        mt-2
        bg-zinc-900
        border
        border-zinc-800
        rounded-xl
        overflow-hidden
        z-50
        shadow-xl
      "
              >
                {suggestions.map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setQuery(
                          suggestion
                        );

                        setShowSuggestions(
                          false
                        );
                      }}
                      className="
              w-full
              text-left
              px-4
              py-3
              hover:bg-zinc-800
              transition-colors
            "
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            )}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">

          <div className="mb-8">
            <label className="block text-sm text-zinc-400 mb-2">
              Source
            </label>

            <select
              value={source}
              onChange={(e) =>
                setSource(e.target.value)
              }
              className="
      bg-zinc-900
      border
      border-zinc-700
      text-white
      rounded-xl
      px-4
      py-3
      w-full
      md:w-72
      focus:outline-none
      focus:border-blue-500
    "
            >
              <option value="">
                All Sources
              </option>

              {sources.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-8">
            <label className="block text-sm text-zinc-400 mb-2">
              Sort By
            </label>

            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value)
              }
              className="
      bg-zinc-900
      border
      border-zinc-700
      text-white
      rounded-xl
      px-4
      py-3
      w-full
      md:w-72
      focus:outline-none
      focus:border-blue-500
    "
            >
              <option value="relevant">
                Most Relevant
              </option>

              <option value="latest">
                Latest
              </option>

              <option value="trending">
                Trending
              </option>
            </select>
          </div>
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
          <SearchResults
            articles={articles}
          />
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
        {!loading &&
          !query &&
          !category && (
            <div className="text-center py-24">
              <p className="text-5xl mb-4">
                📰
              </p>

              <p className="text-zinc-500 text-lg mb-8">
                Start typing to discover
                articles
              </p>

              {recentSearches.length >
                0 && (
                  <div>
                    <h3 className="text-white font-semibold mb-4">
                      Recent Searches
                    </h3>

                    <div className="flex justify-center flex-wrap gap-3">
                      {recentSearches.map(
                        (search) => (
                          <button
                            key={search}
                            onClick={() =>
                              setQuery(
                                search
                              )
                            }
                            className="px-4 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                          >
                            {search}
                          </button>
                        )
                      )}
                    </div>
                    <button
                      onClick={() => {
                        localStorage.removeItem(
                          "recentSearches"
                        );

                        setRecentSearches([]);
                      }}
                      className="mt-4 text-sm text-zinc-500 hover:text-white"
                    >
                      Clear History
                    </button>
                  </div>
                )}
            </div>
          )}
      </div>
    </div>
  );
};

export default SearchPage;