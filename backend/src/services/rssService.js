import Parser from "rss-parser";

import Article from "../models/Article.js";

import rssFeeds from "../config/rssFeeds.js";

const parser = new Parser();

const fetchRSSFeeds = async () => {
  try {
    for (const feed of rssFeeds) {
      console.log(
        `Fetching RSS from ${feed.source}`
      );

      const parsedFeed =
        await parser.parseURL(feed.url);

      for (const item of parsedFeed.items) {
        if (!item.title || !item.link) {
          continue;
        }

        // duplicate check
        const exists =
          await Article.findOne({
            url: item.link,
          });

        if (!exists) {
          await Article.create({
            title: item.title,

            description:
              item.contentSnippet ||
              item.content ||
              "",

            content:
              item.content || "",

            url: item.link,

            imageUrl:
              item.enclosure?.url || "",

            source: feed.source,

            category:
              feed.category,

            author:
              item.creator || "",

            publishedAt:
              item.pubDate ||
              new Date(),
          });
        }
      }

      console.log(
        `${feed.source} RSS fetched`
      );
    }

    console.log(
      "All RSS feeds processed"
    );
  } catch (error) {
    console.error(error.message);
  }
};

export default fetchRSSFeeds;