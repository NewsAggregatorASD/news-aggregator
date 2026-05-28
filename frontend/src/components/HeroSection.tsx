import Link from "next/link";

const HeroSection = ({
  article,
}: any) => {
  if (!article) return null;

  return (
    <section className="mb-14 md:mb-20">
      <Link
        href={`/article/${article._id}`}
      >
        <div className="relative overflow-hidden rounded-3xl h-125 md:h-162.5 group">
          {/* IMAGE */}
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-blue-500/20 via-zinc-900 to-black" />
          )}

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-black/10" />

          {/* CONTENT */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full p-5 sm:p-8 md:p-12">
              {/* BADGE */}
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/20 text-blue-300 text-xs sm:text-sm mb-4 md:mb-6">
                Trending Now
              </span>

              {/* TITLE */}
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight max-w-5xl mb-4 md:mb-6">
                {article.title}
              </h1>

              {/* DESCRIPTION */}
              <p className="hidden sm:block text-zinc-300 text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl line-clamp-2 md:line-clamp-3 mb-6">
                {article.description}
              </p>

              {/* META */}
              <div className="flex flex-wrap items-center gap-3 md:gap-5 text-xs sm:text-sm text-zinc-400">
                <span className="text-white font-medium">
                  {article.source}
                </span>

                <span className="hidden sm:inline">
                  •
                </span>

                <span>
                  {new Date(
                    article.publishedAt
                  ).toLocaleDateString()}
                </span>

                {article.author && (
                  <>
                    <span className="hidden sm:inline">
                      •
                    </span>

                    <span className="truncate max-w-45">
                      {article.author}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default HeroSection;