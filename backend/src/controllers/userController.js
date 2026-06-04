import User from "../models/User.js";

import Article from "../models/Article.js";

import { generateRecommendations } from "../services/recommendationService.js";


// ADD BOOKMARK
export const bookmarkArticle =
  async (req, res) => {
    try {
      const userId = req.user._id;

      const { articleId } = req.body;

      const article =
        await Article.findById(
          articleId
        );

      if (!article) {
        return res.status(404).json({
          message: "Article not found",
        });
      }

      const user =
        await User.findById(userId);

      // prevent duplicates
      const alreadyBookmarked =
        user.bookmarkedArticles.includes(
          articleId
        );

      if (alreadyBookmarked) {
        return res.status(400).json({
          message:
            "Article already bookmarked",
        });
      }

      user.bookmarkedArticles.push(
        articleId
      );

      article.bookmarks += 1;

      await user.save();

      await article.save();

      res.json({
        message:
          "Article bookmarked successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


// REMOVE BOOKMARK
export const removeBookmark =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        );

      const { articleId } = req.params;

      user.bookmarkedArticles =
        user.bookmarkedArticles.filter(
          (id) =>
            id.toString() !== articleId
        );

      await user.save();

      res.json({
        message:
          "Bookmark removed successfully",
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };


// GET BOOKMARKS
export const getBookmarks =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        ).populate({
          path: "bookmarkedArticles",

          options: {
            sort: {
              publishedAt: -1,
            },
          },
        });

      res.json(
        user.bookmarkedArticles
      );
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const checkBookmarkStatus =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        );

      const { articleId } = req.params;

      const bookmarked =
        user.bookmarkedArticles.some(
          (id) =>
            id.toString() === articleId
        );

      res.json({ bookmarked });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const getRecommendations =
  async (req, res) => {
    try {
      const recommendations =
        await generateRecommendations(
          req.user._id
        );

      res.json(recommendations);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const getReadingHistory =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        ).populate(
          "readingHistory.article"
        );

      // sort manually
      const sortedHistory =
        user.readingHistory.sort(
          (a, b) =>
            new Date(b.viewedAt) -
            new Date(a.viewedAt)
        );

      res.json(sortedHistory);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const getDashboard =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        )
          .populate(
            "bookmarkedArticles"
          )
          .populate(
            "readingHistory.article"
          );

      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      const bookmarks =
        user.bookmarkedArticles || [];

      const readingHistory =
        [
          ...new Map(
            user.readingHistory
              .slice(-20)
              .reverse()
              .map((item) => [
                item.article._id.toString(),
                item.article,
              ])
          ).values(),
        ].slice(0, 10);

      const recommendations =
        await generateRecommendations(
          req.user._id
        );

      const categoryCounts = {};

      user.readingHistory.forEach(
        (item) => {
          categoryCounts[item.category] =
            (categoryCounts[item.category] || 0) + 1;
        }
      );

      const favoriteCategory =
        Object.keys(categoryCounts)
          .sort(
            (a, b) =>
              categoryCounts[b] -
              categoryCounts[a]
          )[0] || "None";

      res.json({
        user,
        stats: {
          bookmarks:
            bookmarks.length,

          articlesRead:
            readingHistory.length,

          favoriteCategory:
            favoriteCategory,
        },

        bookmarks,

        readingHistory,

        recommendations,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const updateInterests =
  async (req, res) => {
    try {
      const { interests } = req.body;

      const user =
        await User.findByIdAndUpdate(
          req.user._id,
          {
            interests,
          },
          {
            new: true,
          }
        );

      res.json({
        interests:
          user.interests,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };