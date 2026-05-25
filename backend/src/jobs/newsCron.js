import cron from "node-cron";

import fetchNews from "../services/newsService.js";
import fetchRSSFeeds from "../services/rssService.js";

const startNewsCron = () => {
    // every 15 minutes
    cron.schedule("*/15 * * * *", async () => {
        console.log(
            `Fetching news at ${new Date()}`
        );

        await fetchNews();

        await fetchRSSFeeds();

        console.log(
            `News fetch completed at ${new Date()}`
        );
    });

    console.log(
        "News cron job started"
    );
};

export default startNewsCron;