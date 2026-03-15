import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
import Game from "../models/Game";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const BASE_URL = "https://api.balldontlie.io/nba/v1";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const fetchGame = async (externalId: number) => {
  const apiKey = process.env.BALLDONTLIE_API_KEY;
  const res = await fetch(`${BASE_URL}/games/${externalId}`, {
    headers: { Authorization: apiKey as string },
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const json = await res.json();
  return json.data;
};

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("MongoDB Connected");

  const games = await Game.find({
    status: "final",
    homeQ1: null,
    externalId: { $exists: true },
    date: {
      $gte: new Date("2025-10-21T00:00:00.000Z"),
      $lte: new Date("2026-04-16T23:59:59.999Z"),
    },
  }).select("_id externalId");

  console.log(`Found ${games.length} games to backfill`);

  let updated = 0;
  let failed = 0;

  for (const game of games) {
    try {
      const data = await fetchGame(game.externalId);

      await Game.findByIdAndUpdate(game._id, {
        homeQ1: data.home_q1 ?? null,
        homeQ2: data.home_q2 ?? null,
        homeQ3: data.home_q3 ?? null,
        homeQ4: data.home_q4 ?? null,
        homeOT: data.home_ot1 ?? null,
        awayQ1: data.visitor_q1 ?? null,
        awayQ2: data.visitor_q2 ?? null,
        awayQ3: data.visitor_q3 ?? null,
        awayQ4: data.visitor_q4 ?? null,
        awayOT: data.visitor_ot1 ?? null,
      });

      updated++;
      console.log(
        `✓ ${updated}/${games.length} (externalId: ${game.externalId})`,
      );

      await sleep(1500);
    } catch (err: any) {
      if (err.message?.includes("429")) {
        console.log("429 hit, waiting 60s...");
        await sleep(5000);
        try {
          const data = await fetchGame(game.externalId);
          await Game.findByIdAndUpdate(game._id, {
            homeQ1: data.home_q1 ?? null,
            homeQ2: data.home_q2 ?? null,
            homeQ3: data.home_q3 ?? null,
            homeQ4: data.home_q4 ?? null,
            homeOT: data.home_ot1 ?? null,
            awayQ1: data.visitor_q1 ?? null,
            awayQ2: data.visitor_q2 ?? null,
            awayQ3: data.visitor_q3 ?? null,
            awayQ4: data.visitor_q4 ?? null,
            awayOT: data.visitor_ot1 ?? null,
          });
          updated++;
        } catch {
          console.error(`✗ Failed twice for externalId: ${game.externalId}`);
          failed++;
        }
      } else {
        console.error(
          `✗ Failed for externalId: ${game.externalId} — ${err.message}`,
        );
        failed++;
      }
    }
  }

  console.log(`\nDone! Updated: ${updated}, Failed: ${failed}`);
  await mongoose.disconnect();
};

run().catch(console.error);
