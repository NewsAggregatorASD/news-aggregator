import express from "express";

import {
  getArticles,
  getArticleById,
  getArticlesByCategory,
  getTrendingArticles,
  searchArticles,
  getSources,
  getSearchSuggestions,
} from "../controllers/articleController.js";

import optionalAuth from "../middleware/optionalAuth.js";

const router = express.Router();

router.get("/", getArticles);

router.get(
  "/category/:category",
  getArticlesByCategory
);

router.get(
  "/trending",
  getTrendingArticles
);

router.get(
  "/search",
  searchArticles
);

router.get(
  "/sources",
  getSources
);

router.get(
  "/suggestions",
  getSearchSuggestions
);

router.get(
  "/:id",
  optionalAuth,
  getArticleById
);

export default router;