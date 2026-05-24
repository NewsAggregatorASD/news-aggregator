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

      if (
        !user ||
        user.readingHistory.length === 0
      ) {
        // fallback trending articles
        return await Article.find()
          .sort({
            trendingScore: -1,
          })
          .limit(20);
      }

      // category frequency map
      const categoryCount = {};

      user.readingHistory.forEach(
        (item) => {
          categoryCount[
            item.category
          ] =
            (categoryCount[
              item.category
            ] || 0) + 1;
        }
      );

      // favorite categories
      const favoriteCategories =
        Object.entries(categoryCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map((item) => item[0]);

      // articles already viewed
      const viewedArticles =
        user.readingHistory.map(
          (item) => item.article
        );

      // fetch recommendations
      const recommendations =
        await Article.find({
          category: {
            $in: favoriteCategories,
          },

          _id: {
            $nin: viewedArticles,
          },
        })
          .sort({
            trendingScore: -1,
          })
          .limit(20);

      return recommendations;
    } catch (error) {
      console.error(error.message);

      return [];
    }
  };