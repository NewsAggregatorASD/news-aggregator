import Article from "../models/Article.js";
import { trackReadingHistory } from "../services/recommendationService.js";
import { extract } from "@extractus/article-extractor";

// GET ALL ARTICLES
export const getArticles = async (
    req,
    res
) => {
    try {
        const articles =
            await Article.find()
                .sort({ publishedAt: -1 })
                .limit(50);

        res.json(articles);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


// GET SINGLE ARTICLE
export const getArticleById =
    async (req, res) => {
        try {
            const article =
                await Article.findById(
                    req.params.id
                );

            if (!article) {
                return res.status(404).json({
                    message:
                        "Article not found",
                });
            }

            // engagement tracking
            article.views += 1;

            article.clicks += 1;

            // extract full content only once
            if (
                !article.contentExtracted
            ) {
                try {
                    console.log(
                        `Extracting content for ${article.url}`
                    );

                    const extracted =
                        await extract(
                            article.url
                        );

                    if (
                        extracted?.content
                    ) {
                        article.fullContent =
                            extracted.content;

                        article.contentExtracted =
                            true;
                    }
                } catch (error) {
                    console.log(
                        "Extraction failed"
                    );
                }
            }

            // RELATED ARTICLES
            const relatedArticles =
                await Article.find({
                    _id: {
                        $ne: article._id,
                    },

                    category:
                        article.category,
                })
                    .sort({
                        trendingScore: -1,
                    })
                    .limit(6);

            await article.save();

            // recommendation tracking
            if (req.user) {
                await trackReadingHistory(
                    req.user._id,
                    article._id
                );
            }

            res.json({
                article,

                relatedArticles,
            });
        } catch (error) {
            console.error(error);

            res.status(500).json({
                message:
                    error.message,
            });
        }
    };

export const getArticlesByCategory =
    async (req, res) => {
        try {
            const { category } = req.params;

            const articles =
                await Article.find({
                    category,
                })
                    .sort({ publishedAt: -1 })
                    .limit(30);

            res.json(articles);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    };

export const getTrendingArticles =
    async (req, res) => {
        try {
            const articles =
                await Article.find()
                    .sort({
                        trendingScore: -1,
                    })
                    .limit(20);

            res.json(articles);
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    };

export const searchArticles = async (
    req,
    res
) => {
    try {
        const {
            q,
            category,
            source,
        } = req.query;

        const query = {};

        // text search
        if (q) {
            query.$text = {
                $search: q,
            };
        }

        // category filter
        if (category) {
            query.category = category;
        }

        // source filter
        if (source) {
            query.source = source;
        }

        const page =
            parseInt(req.query.page) || 1;

        const limit = 20;

        const skip = (page - 1) * limit;

        const articles =
            await Article.find(
                query,
                q
                    ? {
                        score: {
                            $meta: "textScore",
                        },
                    }
                    : {}
            )
                .sort(
                    q
                        ? {
                            score: {
                                $meta: "textScore",
                            },
                        }
                        : {
                            publishedAt: -1,
                        }
                )
                .skip(skip)
                .limit(limit);

        res.json(articles);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};