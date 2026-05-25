import Article from "../models/Article.js";

import calculateTrendingScore
from "../utils/calculateTrendingScore.js";

const updateTrendingScores =
  async () => {
    try {
      const articles =
        await Article.find();

      for (const article of articles) {
        article.trendingScore =
          calculateTrendingScore(
            article
          );

        await article.save();
      }

      console.log(
        "Trending scores updated"
      );
    } catch (error) {
      console.error(error.message);
    }
  };

export default updateTrendingScores;