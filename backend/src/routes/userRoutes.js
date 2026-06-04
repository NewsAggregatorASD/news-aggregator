import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  bookmarkArticle,
  removeBookmark,
  getBookmarks,
  checkBookmarkStatus,
  getRecommendations,
  getReadingHistory,
  getDashboard,
  updateInterests,
} from "../controllers/userController.js";

const router = express.Router();


// BOOKMARKS
router.post(
  "/bookmarks",
  protect,
  bookmarkArticle
);

router.delete(
  "/bookmarks/:articleId",
  protect,
  removeBookmark
);

router.get(
  "/bookmarks",
  protect,
  getBookmarks
);

router.get(
  "/bookmarks/check/:articleId",
  protect,
  checkBookmarkStatus
);

router.get(
  "/recommendations",
  protect,
  getRecommendations
);

router.get(
  "/history",
  protect,
  getReadingHistory
);

router.get(
  "/dashboard",
  protect,
  getDashboard
);

router.patch(
  "/interests",
  protect,
  updateInterests
);

export default router;