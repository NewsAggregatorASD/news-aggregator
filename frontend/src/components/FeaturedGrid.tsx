import Link from "next/link";

import { Article }
from "@/types/article";

interface Props {
  articles: Article[];
}

const FeaturedGrid = ({
  articles,
}: Props) => {
  if (!articles?.length) {
    return null;
  }

  const featured =
    articles.slice(0, 1);

  const secondary =
    articles.slice(1, 5);

  return (
    <section className="mb-20">
      {/* SECTION HEADER */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Featured Stories
        </h2>

        <p className="text-zinc-500 mt-2">
          Handpicked highlights from
          today’s coverage
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* MAIN FEATURED */}
        <div className="lg:col-span-2">
          {featured.map((article) => (
            <Link
              key={article._id}
              href={`/article/${article._id}`}
            >
              <article className="relative h-125 overflow-hidden rounded-3xl group">
                <img
                  src={
                    article.imageUrl ||
                    "https://images.unsplash.com/photo-1504711434969-e33886168f5c"
                  }
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

                <div className="absolute bottom-0 p-8">
                  <span className="inline-block mb-4 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/20 text-blue-300 text-sm">
                    Featured
                  </span>

                  <h3 className="text-4xl font-bold text-white leading-tight mb-4">
                    {article.title}
                  </h3>

                  <p className="text-zinc-300 text-lg line-clamp-2">
                    {article.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* SIDE STORIES */}
        <div className="flex flex-col gap-6">
          {secondary.map((article) => (
            <Link
              key={article._id}
              href={`/article/${article._id}`}
            >
              <article className="group flex gap-4 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all">
                <div className="w-32 h-32 shrink-0 overflow-hidden">
                  <img
                    src={
                      article.imageUrl ||
                      "https://images.unsplash.com/photo-1504711434969-e33886168f5c"
                    }
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-4 flex flex-col justify-center">
                  <span className="text-xs text-blue-400 mb-2">
                    {article.source}
                  </span>

                  <h4 className="text-white font-semibold line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {article.title}
                  </h4>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGrid;