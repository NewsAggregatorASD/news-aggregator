"use client";



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
    <section className="mb-14 md:mb-20 fade-in">
      {/* HEADER */}
      <div className="flex items-end justify-between mb-5 md:mb-7">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            {title}
          </h2>

          <p className="text-sm md:text-base text-zinc-500 mt-1">
            Curated stories updated
            continuously
          </p>
        </div>

      </div>

      {/* SCROLL CONTAINER */}
      <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
        {articles.map((article) => (
          <div
            key={article._id}
            className="
              min-w-70
              sm:min-w-[320px]
              md:min-w-85
              max-w-70
              sm:max-w-[320px]
              md:max-w-85
              shrink-0
              snap-start
            "
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