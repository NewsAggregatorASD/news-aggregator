export interface Article {
  _id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  imageUrl: string;
  source: string;
  category: string;
  author: string;
  publishedAt: string;
  trendingScore: number;
}