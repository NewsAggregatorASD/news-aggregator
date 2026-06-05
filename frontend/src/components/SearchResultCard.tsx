"use client";

import Link from "next/link";
import { Clock3 } from "lucide-react";

import { Article } from "@/types/article";

interface Props {
  article: Article;
}

export default function SearchResultCard({
  article,
}: Props) {
  return (
    <Link
      href={`/article/${article._id}`}
      className="block"
    >
      <article className="group flex gap-4 p-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 transition-all">
        {/* IMAGE */}
        <div className="w-32 h-24 sm:w-40 sm:h-28 shrink-0 overflow-hidden rounded-xl">
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-blue-500/20 via-zinc-900 to-black" />
          )}
        </div>

        {/* CONTENT */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mb-2">
            <span className="text-blue-400">
              {article.source}
            </span>

            <span>•</span>

            <div className="flex items-center gap-1">
              <Clock3 className="w-3 h-3" />
              {new Date(
                article.publishedAt
              ).toLocaleDateString()}
            </div>
          </div>

          <h2 className="text-lg font-semibold text-white mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
            {article.title}
          </h2>

          <p className="text-sm text-zinc-400 line-clamp-2">
            {article.description}
          </p>
        </div>
      </article>
    </Link>
  );
}