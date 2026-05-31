"use client";
import Link from "next/link";
import { Clock3, Flame } from "lucide-react";
import { Article } from "@/types/article";

interface Props { article: Article; }

const getReadTime = (text: string) => {
  const words = text?.split(" ").length || 0;
  return Math.max(1, Math.ceil(words / 200));
};

const cleanText = (text: string) =>
  text?.replace(/[^\w\s.,!?'"()-]/g, "").slice(0, 120) + "...";

const ArticleCard = ({ article }: Props) => {
  return (
    <Link href={`/article/${article._id}`} className="group block h-full">
      <article className="news-card h-full flex flex-col overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all duration-300">

        {/* IMAGE */}
        <div className="relative overflow-hidden h-44 sm:h-52">
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500/20 via-zinc-900 to-black flex items-center justify-center">
              <p className="text-zinc-500 text-sm">No Image</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

          {/* CATEGORY BADGE */}
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-white capitalize">
            {article.category}
          </span>

          {/* TRENDING FIRE BADGE */}
          {article.trendingScore > 0.5 && (
            <span className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-semibold">
              <Flame className="w-3 h-3" />
              {article.trendingScore?.toFixed(1)}
            </span>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-1 p-4">

          {/* SOURCE + DATE */}
          <div className="flex items-center justify-between mb-3 gap-3">
            <span className="text-xs text-blue-400 font-semibold truncate">
              {article.source}
            </span>
            <div className="flex items-center gap-1 text-zinc-500 text-xs shrink-0">
              <Clock3 className="w-3 h-3" />
              {new Date(article.publishedAt).toLocaleDateString()}
            </div>
          </div>

          {/* TITLE */}
          <h2 className="text-base font-semibold leading-snug text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
            {article.title}
          </h2>

          {/* DESCRIPTION — cleaned */}
          <p className="text-zinc-500 text-sm leading-6 line-clamp-2 flex-1">
            {cleanText(article.description || "")}
          </p>

          {/* FOOTER */}
          <div className="mt-4 pt-3 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-xs text-zinc-600">
              {getReadTime(article.description || "")} min read
            </span>
            <span className="text-xs text-blue-400 font-medium group-hover:underline">
              Read more →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;