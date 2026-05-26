import Article from "../models/Article.js";

import {
    generateRecommendations,
} from "../services/recommendationService.js";

import User from "../models/User.js";

// HOMEPAGE FEED
export const getHomepageFeed =
    async (req, res) => {
        try {
            const [
                trending,
                latest,
                technology,
                sports,
                business,
                science,
                health,
                entertainment,
            ] = await Promise.all([
                // TRENDING
                Article.find()
                    .sort({
                        trendingScore: -1,
                    })
                    .limit(8),

                // LATEST
                Article.find()
                    .sort({
                        publishedAt: -1,
                    })
                    .limit(6),

                // TECHNOLOGY
                Article.find({
                    category: "technology",
                })
                    .sort({
                        trendingScore: -1,
                    })
                    .limit(6),

                // SPORTS
                Article.find({
                    category: "sports",
                })
                    .sort({
                        trendingScore: -1,
                    })
                    .limit(6),

                // BUSINESS
                Article.find({
                    category: "business",
                })
                    .sort({
                        trendingScore: -1,
                    })
                    .limit(6),


                // SCIENCE
                Article.find({
                    category: "science",
                })
                    .sort({
                        trendingScore: -1,
                    })
                    .limit(6),

                // HEALTH
                Article.find({
                    category: "health",
                })
                    .sort({
                        trendingScore: -1,
                    })
                    .limit(6),

                // ENTERTAINMENT
                Article.find({
                    category: "entertainment",
                })
                    .sort({
                        trendingScore: -1,
                    })
                    .limit(6),
            ]);

            // recommendations
            let recommendations = [];

            if (req.user) {
                recommendations =
                    await generateRecommendations(
                        req.user._id
                    );
            }

            let continueReading = [];

            if (req.user) {
                const user =
                    await User.findById(
                        req.user._id
                    )
                        .populate(
                            "readingHistory.article"
                        );

                continueReading =
                    user.readingHistory
                        .slice(-10)
                        .reverse()
                        .map((item) => item.article);
            }

            res.json({
                hero: trending[0],

                trending: trending.slice(1),

                latest,

                recommendations,

                categories: {
                    technology,
                    sports,
                    business,
                    science,
                    health,
                    entertainment,
                },
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    };