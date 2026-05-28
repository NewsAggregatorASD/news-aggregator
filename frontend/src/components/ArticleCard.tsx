"use client";

import Link from "next/link";

import {
  Clock3,
  TrendingUp,
} from "lucide-react";

import { Article }
from "@/types/article";

interface Props {
  article: Article;
}

const ArticleCard = ({
  article,
}: Props) => {
  return (
    <Link
      href={`/article/${article._id}`}
      className="group block h-full"
    >
      <article className="news-card h-full flex flex-col overflow-hidden">
        {/* IMAGE */}
        <div className="relative overflow-hidden h-44 sm:h-52 md:h-56">
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-blue-500/20 via-zinc-900 to-black flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 md:w-10 md:h-10 text-blue-400 mx-auto mb-2 md:mb-3" />

                <p className="text-zinc-400 text-xs md:text-sm">
                  News Aggregator
                </p>
              </div>
            </div>
          )}

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent opacity-80" />

          {/* CATEGORY */}
          <div className="absolute top-3 left-3 md:top-4 md:left-4">
            <span className="px-2.5 py-1 md:px-3 md:py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] md:text-xs font-medium text-white capitalize">
              {article.category}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col flex-1 p-4 md:p-5">
          {/* TOP META */}
          <div className="flex items-center justify-between mb-3 md:mb-4 gap-3">
            <span className="text-xs md:text-sm text-blue-400 font-medium truncate">
              {article.source}
            </span>

            <div className="flex items-center gap-1 text-zinc-500 text-[10px] md:text-xs shrink-0">
              <Clock3 className="w-3 h-3" />

              {new Date(
                article.publishedAt
              ).toLocaleDateString()}
            </div>
          </div>

          {/* TITLE */}
          <h2 className="text-lg md:text-xl font-semibold leading-snug text-white mb-3 md:mb-4 line-clamp-2 group-hover:text-blue-400 transition-colors">
            {article.title}
          </h2>

          {/* DESCRIPTION */}
          <p className="text-zinc-400 text-sm leading-6 md:leading-7 line-clamp-3 flex-1">
            {article.description}
          </p>

          {/* FOOTER */}
          <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between">
            <span className="text-[11px] md:text-xs text-zinc-500">
              Trending Score
            </span>

            <span className="text-sm font-semibold text-white">
              {article.trendingScore?.toFixed(
                1
              ) || "0.0"}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ArticleCard;