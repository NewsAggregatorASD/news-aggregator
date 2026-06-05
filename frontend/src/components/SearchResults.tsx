import SearchResultCard
from "./SearchResultCard";

export default function SearchResults({
  articles,
}: any) {
  return (
    <div className="space-y-4">
      {articles.map(
        (article: any) => (
          <SearchResultCard
            key={article._id}
            article={article}
          />
        )
      )}
    </div>
  );
}