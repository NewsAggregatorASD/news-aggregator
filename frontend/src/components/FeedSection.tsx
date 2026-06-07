"use client";
import ArticleCard from "./ArticleCard";
import { Article } from "@/types/article";
import { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Props { title: string; articles: Article[]; }

const FeedSection = ({ title, articles }: Props) => {
  const scrollRef =
    useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({
      left: -700,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({
      left: 700,
      behavior: "smooth",
    });
  };
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

        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={scrollLeft}
            className="
        p-2 rounded-xl
        bg-zinc-900
        border border-zinc-800
        hover:bg-zinc-800
        transition-colors
      "
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={scrollRight}
            className="
        p-2 rounded-xl
        bg-zinc-900
        border border-zinc-800
        hover:bg-zinc-800
        transition-colors
      "
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>


      {/* CARDS ROW */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-black to-transparent z-10 pointer-events-none" />

        <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-black to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollRef}
          className="
    flex gap-4 md:gap-5
    overflow-x-auto
    scrollbar-hide
    pb-2
    snap-x
    snap-mandatory
  "
        >
          {articles.map((article) => (
            <div
              key={article._id}
              className="min-w-70 sm:min-w-[320px] md:min-w-85 max-w-70 sm:max-w-[320px] md:max-w-85 shrink-0 snap-start"
            >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedSection;