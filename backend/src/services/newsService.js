import axios from "axios";

import Article from "../models/Article.js";

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

const fetchNews = async () => {
  try {
    for (const category of categories) {
      console.log(
        `Fetching ${category} news...`
      );

      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines`,
        {
          params: {
            country: "us",
            category,
            pageSize: 20,
            apiKey:
              process.env.NEWS_API_KEY,
          },
        }
      );

      const articles =
        response.data.articles;

      for (const article of articles) {
        // skip incomplete articles
        if (
          !article.title ||
          !article.url
        ) {
          continue;
        }

        // duplicate check
        const exists =
          await Article.findOne({
            url: article.url,
          });

        if (!exists) {
          await Article.create({
            title: article.title,

            description:
              article.description,

            content: article.content,

            url: article.url,

            imageUrl:
              article.urlToImage,

            source:
              article.source?.name,

            author: article.author,

            category,

            publishedAt:
              article.publishedAt,
          });
        }
      }

      console.log(
        `${category} news stored`
      );
    }

    console.log(
      "All categories fetched successfully"
    );
  } catch (error) {
    console.error(error.message);
  }
};

export default fetchNews;