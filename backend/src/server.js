import express from "express";
import "dotenv/config";


import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";

import "./config/passport.js";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

import fetchNews from "./services/newsService.js";
import startNewsCron from "./jobs/newsCron.js";
import fetchRSSFeeds from "./services/rssService.js";
import startTrendingCron from "./jobs/trendingCron.js";
import startDigestCron from "./jobs/digestCron.js";

import userRoutes from "./routes/userRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";


const PORT = process.env.PORT || 5000;

const app = express();

app.use(
  cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000", credentials: true })
);

app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});


app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/home", homeRoutes);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });

    // run these in background
    fetchNews().catch(console.error);
    fetchRSSFeeds().catch(console.error);

    startNewsCron();
    startTrendingCron();
    startDigestCron();

  } catch (error) {
    console.error(error);
  }
};

startServer();