"use client";

import { ChevronRight }
from "lucide-react";

import ArticleCard
from "./ArticleCard";

import { Article }
from "@/types/article";

interface Props {
  title: string;

  articles: Article[];
}

const FeedSection = ({
  title,
  articles,
}: Props) => {
  if (!articles?.length) {
    return null;
  }

  return (
    <section className="mb-16 fade-in">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {title}
          </h2>

          <p className="text-zinc-500 mt-1">
            Curated stories updated
            continuously
          </p>
        </div>


      </div>

      {/* HORIZONTAL SCROLL */}
      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-2">
        {articles.map((article) => (
          <div
            key={article._id}
            className="min-w-[320px] max-w-[320px] shrink-0"
          >
            <ArticleCard
              article={article}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeedSection;