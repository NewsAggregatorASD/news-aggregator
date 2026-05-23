import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
    },

    avatar: {
      type: String,
      default: "",
    },

    interests: {
      type: [String],
      default: [],
    },

    bookmarkedArticles: {
      type: [String],
      default: [],
    },

    role: {
      type: String,
      default: "user",
    },

    googleId: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
    },

    resetPasswordToken: {
      type: String,
    },

    resetPasswordExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;