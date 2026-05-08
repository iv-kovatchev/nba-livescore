import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
import Game from "../models/Game";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("MongoDB Connected");

  const result = await Game.updateMany(
    { date: { $gte: new Date("2026-04-18T00:00:00.000Z") } },
    { $set: { postseason: true } }
  );

  console.log(`Updated ${result.modifiedCount} games to postseason: true`);
  await mongoose.disconnect();
};

run().catch(console.error);