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
            sort,
        } = req.query;

        const query = {};

        // TEXT SEARCH
        if (q) {
            query.$text = {
                $search: q,
            };
        }

        // CATEGORY FILTER
        if (category) {
            query.category = category;
        }

        // SOURCE FILTER
        if (source) {
            query.source = source;
        }

        const page =
            parseInt(req.query.page) || 1;

        const limit = 20;

        const skip = (page - 1) * limit;

        let sortQuery = {};

        // SORTING
        switch (sort) {
            case "latest":
                sortQuery = {
                    publishedAt: -1,
                };
                break;

            case "trending":
                sortQuery = {
                    trendingScore: -1,
                };
                break;

            case "relevant":
            default:
                sortQuery = q
                    ? {
                        score: {
                            $meta: "textScore",
                        },
                    }
                    : {
                        publishedAt: -1,
                    };
        }

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
                .sort(sortQuery)
                .skip(skip)
                .limit(limit);

        const total =
            await Article.countDocuments(
                query
            );

        res.json({
            articles,

            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(
                    total / limit
                ),
            },
        });
    } catch (error) {
        res.status(500).json({
            message:
                error.message,
        });
    }
};

export const getSources =
    async (req, res) => {
        try {
            const sources =
                await Article.distinct(
                    "source"
                );

            res.json(sources);
        } catch (error) {
            res.status(500).json({
                message:
                    error.message,
            });
        }
    };

export const getSearchSuggestions =
  async (req, res) => {
    try {
      const { q } = req.query;

      if (!q || q.length < 2) {
        return res.json([]);
      }

      const articles =
        await Article.find({
          title: {
            $regex: q,
            $options: "i",
          },
        })
          .select("title")
          .limit(10);

      const suggestions = [
        ...new Set(
          articles.map(
            (article) =>
              article.title
          )
        ),
      ];

      res.json(suggestions);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };