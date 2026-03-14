import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
import { syncGamesByDate } from "../services/syncGames";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const syncSeason = async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("MongoDB Connected");

  //const Game = (await import("../models/Game")).default;
  //await Game.deleteMany({});

  // Sync from October 2025 to June 2026
  const start = new Date("2026-03-13");
  const end = new Date("2026-03-13");

  const current = new Date(start);

  while (current <= end) {
    const date = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}-${String(current.getDate()).padStart(2, "0")}`;

    try {
      await syncGamesByDate(date);
      console.log(`✅ Synced ${date}`);
    } catch (error) {
      console.log(`❌ Failed ${date} - skipping`);
    }

    // Wait 1 second between requests to avoid rate limiting
    await sleep(60000);

    current.setDate(current.getDate() + 1);
  }

  console.log("Season sync complete!");
  process.exit(0);
};

syncSeason();
