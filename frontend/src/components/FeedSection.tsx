"use client";
import ArticleCard from "./ArticleCard";
import { Article } from "@/types/article";
import { ChevronRight } from "lucide-react";

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
        <button className="flex items-center gap-1 text-sm text-zinc-400 hover:text-white transition-colors border border-zinc-700 hover:border-zinc-500 px-3 py-1.5 rounded-full">
          See all <ChevronRight className="w-3 h-3" />
        </button>
      </div>

      {/* SCROLL HINT */}
      <p className="text-xs text-zinc-600 mb-3">← scroll →</p>

      {/* CARDS ROW */}
      <div className="flex gap-4 md:gap-5 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory">
        {articles.map((article) => (
          <div
            key={article._id}
            className="min-w-[280px] sm:min-w-[320px] md:min-w-[340px] max-w-[280px] sm:max-w-[320px] md:max-w-[340px] shrink-0 snap-start"
          >
            <ArticleCard article={article} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeedSection;