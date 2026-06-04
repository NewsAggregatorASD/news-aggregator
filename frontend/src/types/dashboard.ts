import { Article } from "./article";

export interface DashboardData {
  user: {
    _id: string;
    username: string;
    email: string;
    avatar: string;
    interests: string[];
    role: string;
    createdAt: string;
  };

  stats: {
    bookmarks: number;
    articlesRead: number;
    favoriteCategory: string;
  };

  bookmarks: Article[];

  readingHistory: Article[];

  recommendations: Article[];
}