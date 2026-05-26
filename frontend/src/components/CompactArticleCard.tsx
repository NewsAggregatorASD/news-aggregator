"use client";

import Link from "next/link";

import {
  Clock3,
} from "lucide-react";

import { Article }
from "@/types/article";

interface Props {
  article: Article;
}

const CompactArticleCard = ({
  article,
}: Props) => {
  return (
    <Link
      href={`/article/${article._id}`}
      className="group"
    >
      <article className="flex gap-5 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all hover:bg-zinc-800/70">
        {/* IMAGE */}
        <div className="w-40 h-40 shrink-0 overflow-hidden">
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
        <div className="flex flex-col justify-between p-5 flex-1">
          {/* TOP */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs uppercase tracking-wide text-blue-400">
                {article.category}
              </span>

              <div className="flex items-center gap-1 text-zinc-500 text-xs">
                <Clock3 className="w-3 h-3" />

                {new Date(
                  article.publishedAt
                ).toLocaleDateString()}
              </div>
            </div>

            <h3 className="text-xl font-semibold text-white leading-snug line-clamp-2 group-hover:text-blue-400 transition-colors mb-3">
              {article.title}
            </h3>

            <p className="text-sm text-zinc-400 line-clamp-2 leading-6">
              {article.description}
            </p>
          </div>

          {/* FOOTER */}
          <div className="mt-5 flex items-center justify-between">
            <span className="text-sm text-zinc-500">
              {article.source}
            </span>

            <span className="text-sm text-blue-400 font-medium">
              Read More →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default CompactArticleCard;