const calculateTrendingScore = (
  article
) => {
  const hoursSincePublished =
    (Date.now() -
      new Date(
        article.publishedAt
      ).getTime()) /
    (1000 * 60 * 60);

  const score =
    (article.views * 1 +
      article.bookmarks * 3 +
      article.clicks * 2 +
      article.shares * 4) /
    (hoursSincePublished + 2);

  return Number(score.toFixed(2));
};

export default calculateTrendingScore;