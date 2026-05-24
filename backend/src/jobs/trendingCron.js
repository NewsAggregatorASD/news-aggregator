import cron from "node-cron";

import updateTrendingScores
from "../services/trendingService.js";

const startTrendingCron = () => {
  cron.schedule("*/10 * * * *", async () => {
    console.log(
      "Updating trending scores..."
    );

    await updateTrendingScores();
  });

  console.log(
    "Trending cron started"
  );
};

export default startTrendingCron;