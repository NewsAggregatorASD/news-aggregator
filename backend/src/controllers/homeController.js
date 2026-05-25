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
            ] = await Promise.all([
                Article.find()
                    .sort({
                        trendingScore: -1,
                    })
                    .limit(10),

                Article.find()
                    .sort({
                        publishedAt: -1,
                    })
                    .limit(10),

                Article.find({
                    category: "technology",
                })
                    .sort({
                        trendingScore: -1,
                    })
                    .limit(10),

                Article.find({
                    category: "sports",
                })
                    .sort({
                        trendingScore: -1,
                    })
                    .limit(10),

                Article.find({
                    category: "business",
                })
                    .sort({
                        trendingScore: -1,
                    })
                    .limit(10),
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
                trending,
                latest,
                recommendations,
                categories: {
                    technology,
                    sports,
                    business,
                },
                continueReading,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    };