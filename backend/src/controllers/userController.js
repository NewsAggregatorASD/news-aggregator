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