import CompactArticleCard
from "./CompactArticleCard";

const RelatedArticles = ({
  articles,
}: any) => {
  if (!articles?.length) {
    return null;
  }

  return (
    <section className="mt-24">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-white tracking-tight mb-3">
          Continue Reading
        </h2>

        <p className="text-zinc-500">
          More stories related to
          this topic
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {articles.map(
          (article: any) => (
            <CompactArticleCard
              key={article._id}
              article={article}
            />
          )
        )}
      </div>
    </section>
  );
};

export default RelatedArticles;