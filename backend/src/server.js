import express from "express";
import "dotenv/config";


import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";

import "./config/passport.js";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";



connectDB();

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


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});