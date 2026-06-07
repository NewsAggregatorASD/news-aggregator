import express from "express";
import passport from "passport";

import {
  registerUser,
  loginUser,
  getMe,
  refreshAccessToken,
  logoutUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";
import generateAccessToken
from "../utils/generateAccessToken.js";

import generateRefreshToken
from "../utils/generateRefreshToken.js";

const router = express.Router();


// PUBLIC
router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/refresh", refreshAccessToken);

router.post("/logout", logoutUser);


// PROTECTED
router.get("/me", protect, getMe);

router.get(
  "/google",

  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/verify-email/:token",
  verifyEmail
);

router.get(
  "/google/callback",

  passport.authenticate("google", {
    session: false,
  }),

  async (req, res) => {
    const accessToken =
      generateAccessToken(req.user._id);

    const refreshToken =
      generateRefreshToken(req.user._id);

    res.cookie(
      "refreshToken",
      refreshToken,
      {
        httpOnly: true,
        secure: false,
        sameSite: "strict",

        maxAge:
          7 *
          24 *
          60 *
          60 *
          1000,
      }
    );

    // redirect frontend
    res.redirect(`${process.env.FRONTEND_URL}/oauth-success?token=${accessToken}`);
  }
);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/reset-password/:token",
  resetPassword
);

export default router;