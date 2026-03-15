import cron from "node-cron";
import { syncGamesByDate } from "../services/syncGames";

const getETDate = (offset: number = 0): string => {
  const now = new Date();
  now.setDate(now.getDate() + offset);
  const etDate = new Date(
    now.toLocaleString("en-US", { timeZone: "America/New_York" }),
  );
  return `${etDate.getFullYear()}-${String(etDate.getMonth() + 1).padStart(2, "0")}-${String(etDate.getDate()).padStart(2, "0")}`;
};

export const startCronJobs = () => {
  //Cron 1 - Every day 8AM ET - sync next 7 days
  cron.schedule(
    "0 8 * * *",
    async () => {
      console.log("Cron: syncing next 7 days schedule");
      for (let i = 1; i <= 7; i++) {
        try {
          const date = getETDate(i);
          await syncGamesByDate(date);
          console.log(`Synced ${date}`);
        } catch (error) {
          console.log(`Failed syncing day +${i}`);
        }
      }
    },
    { timezone: "America/New_York" },
  );

  //Cron 2 - Every 1 min, 1PM-1AM ET - sync live scores
  // cron.schedule('* 13-23,0,1 * * *', async () => {
  //   try {
  //     const date = getETDate(0);
  //     console.log(`Cron: syncing live scores for ${date}`);
  //     await syncGamesByDate(date);
  //   } catch (error) {
  //     console.log('Failed syncing live scores');
  //   }
  // }, { timezone: 'America/New_York' });

  //Every 15 secs, 1PM-1AM ET - sync live scores

  console.log("Cron jobs started");
};

export const startLiveScoreSync = () => {
  setInterval(async () => {
    try {
      const date = getETDate(0);
      console.log(`Live sync: ${date}`);
      await syncGamesByDate(date);
    } catch (error) {
      console.log("Failed syncing live scores");
    }
  }, 20000);
};
