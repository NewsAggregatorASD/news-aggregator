import express from "express";
import "dotenv/config";


import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";

import "./config/passport.js";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";

import fetchNews from "./services/newsService.js";
import startNewsCron from "./jobs/newsCron.js";
import fetchRSSFeeds from "./services/rssService.js";
import startTrendingCron from "./jobs/trendingCron.js";

import userRoutes from "./routes/userRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";


const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    await fetchNews();

    await fetchRSSFeeds();

    startNewsCron();
    startTrendingCron();

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();

const app = express();

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use(passport.initialize());
// ROUTES
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("API Running");
});


app.use("/api/users", userRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/home", homeRoutes);