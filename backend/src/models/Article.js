import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
        },

        content: {
            type: String,
        },

        url: {
            type: String,
            required: true,
            unique: true,
        },

        imageUrl: {
            type: String,
        },

        source: {
            type: String,
        },

        author: {
            type: String,
        },

        category: {
            type: String,
            default: "general",
        },

        publishedAt: {
            type: Date,
        },

        language: {
            type: String,
            default: "en",
        },

        views: {
            type: Number,
            default: 0,
        },

        bookmarks: {
            type: Number,
            default: 0,
        },

        trendingScore: {
            type: Number,
            default: 0,
        },

        clicks: {
            type: Number,
            default: 0,
        },

        shares: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

articleSchema.index({
  title: "text",
  description: "text",
  content: "text",
  source: "text",
  category: "text",
  author: "text",
});

const Article = mongoose.model(
    "Article",
    articleSchema
);

export default Article;