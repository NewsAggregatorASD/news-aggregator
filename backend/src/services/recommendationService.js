import User from "../models/User.js";

import Article from "../models/Article.js";


// TRACK USER READING
export const trackReadingHistory =
  async (userId, articleId) => {
    try {
      const user =
        await User.findById(userId);

      const article =
        await Article.findById(
          articleId
        );

      if (!user || !article) {
        return;
      }

      // avoid duplicate immediate history
      const alreadyExists =
        user.readingHistory.some(
          (item) =>
            item.article.toString() ===
            articleId
        );

      if (!alreadyExists) {
        user.readingHistory.push({
          article: article._id,

          category:
            article.category,
        });

        await user.save();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

export const generateRecommendations =
  async (userId) => {
    try {
      const user =
        await User.findById(userId);

      if (!user) {
        return [];
      }

      // -------------------------
      // FALLBACK
      // -------------------------

      if (
        user.readingHistory.length === 0 &&
        user.interests.length === 0
      ) {
        return await Article.find()
          .sort({
            trendingScore: -1,
          })
          .limit(20);
      }

      // -------------------------
      // CATEGORY FREQUENCY
      // -------------------------

      const categoryCount = {};

      user.readingHistory.forEach(
        (item) => {
          if (!item.category)
            return;

          categoryCount[
            item.category
          ] =
            (categoryCount[
              item.category
            ] || 0) + 1;
        }
      );

      // Top history categories
      const historyCategories =
        Object.entries(
          categoryCount
        )
          .sort(
            (a, b) =>
              b[1] - a[1]
          )
          .slice(0, 3)
          .map(
            (item) => item[0]
          );

      // -------------------------
      // USER INTERESTS
      // -------------------------

      const interestCategories =
        user.interests || [];

      // -------------------------
      // MERGE CATEGORIES
      // -------------------------

      const recommendationCategories =
        [
          ...new Set([
            ...historyCategories,
            ...interestCategories,
          ]),
        ];

      // -------------------------
      // EXCLUDE VIEWED ARTICLES
      // -------------------------

      const viewedArticles =
        user.readingHistory
          .map((item) =>
            item.article?.toString()
          )
          .filter(Boolean);

      // -------------------------
      // FETCH CANDIDATES
      // -------------------------

      const candidateArticles =
        await Article.find({
          category: {
            $in: recommendationCategories,
          },

          _id: {
            $nin: viewedArticles,
          },
        }).limit(100);

      // -------------------------
      // SCORE ARTICLES
      // -------------------------

      const scoredArticles =
        candidateArticles.map(
          (article) => {
            let score =
              article.trendingScore ||
              0;

            // Reading history weight
            score +=
              categoryCount[
                article.category
              ] || 0;

            // Extra bonus if category
            // is one of top history categories
            if (
              historyCategories.includes(
                article.category
              )
            ) {
              score += 15;
            }

            // Explicit interests
            if (
              interestCategories.includes(
                article.category
              )
            ) {
              score += 5;
            }

            return {
              article,
              score,
            };
          }
        );

      // -------------------------
      // SORT
      // -------------------------

      scoredArticles.sort(
        (a, b) =>
          b.score - a.score
      );

      // -------------------------
      // RETURN TOP RESULTS
      // -------------------------

      return scoredArticles
        .slice(0, 20)
        .map(
          (item) => item.article
        );
    } catch (error) {
      console.error(
        "Recommendation Error:",
        error
      );

      return [];
    }
  };
