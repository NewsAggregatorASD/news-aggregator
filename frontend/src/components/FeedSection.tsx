"use client";
import ArticleCard from "./ArticleCard";
import { Article } from "@/types/article";

interface Props { title: string; articles: Article[]; }

const FeedSection = ({ title, articles }: Props) => {
  if (!articles?.length) return null;

  return (
    <section className="mb-16 fade-in">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            {title}
          </h2>
          <p className="text-sm text-zinc-500 mt-1">
            {articles.length} stories · updated continuously
          </p>
        </div>
      </div>

      {/* SCROLL HINT */}
      <p className="text-xs text-zinc-600 mb-3">← scroll →</p>

      {/* CARDS ROW */}
      <div className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
        {articles.map((article) => (
          <div
            key={article._id}
            className="min-w-70 sm:min-w-[320px] md:min-w-85 max-w-70 sm:max-w-[320px] md:max-w-85 shrink-0 snap-start"
          >
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeedSection;