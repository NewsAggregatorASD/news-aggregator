import express from "express";

import optionalAuth
from "../middleware/optionalAuth.js";

import {
  getHomepageFeed,
} from "../controllers/homeController.js";

const router = express.Router();

router.get(
  "/",
  optionalAuth,
  getHomepageFeed
);

export default router;