import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
import Player from "../models/Player";
import Team from "../models/Team";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const BASE_URL = "https://api.balldontlie.io/nba/v1";
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const fetchPlayersByTeam = async (teamId: Number) => {
  const apiKey = process.env.BALLDONTLIE_API_KEY;
  const res = await fetch(
    `${BASE_URL}/players/active?team_ids[]=${teamId}&per_page=100`,
    { headers: { Authorization: apiKey as string } },
  );
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const json = await res.json();
  return json.data;
};

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("MongoDB Connected");
  console.log("Cleared players collection");

  await Player.deleteMany({});

  const teams = await Team.find();
  console.log(`Found ${teams.length} teams`);

  let total = 0;

  for (const team of teams) {
    try {
      const players = await fetchPlayersByTeam(team.externalId);

      for (const p of players) {
        await Player.findOneAndUpdate(
          { externalId: p.id },
          {
            firstName: p.first_name,
            lastName: p.last_name,
            position: p.position || "",
            jerseyNumber: p.jersey_number ? parseInt(p.jersey_number) : null,
            height: p.height ?? null,
            weight: p.weight ?? null,
            birthDate: p.birth_date ?? null,
            nationality: p.country ?? null,
            team: team._id,
            externalId: p.id,
          },
          { upsert: true, returnDocument: "after" },
        );
        total++;
      }

      console.log(`✓ ${team.city} ${team.name} — ${players.length} players`);
      await sleep(10000);
    } catch (err: any) {
      console.error(`✗ Failed for ${team.city} ${team.name} — ${err.message}`);
    }
  }

  console.log(`\nDone! Total players seeded: ${total}`);
  await mongoose.disconnect();
};

run().catch(console.error);
