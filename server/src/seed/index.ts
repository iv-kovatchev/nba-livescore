import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import Arena from '../models/Arena';
import Team from '../models/Team';
import Player from '../models/Player';
import arenas from './arenas';
import getTeams from './teams';
import getCeltics from './players/celtics';

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB Connected');

    // Clear existing data
    await Arena.deleteMany({});
    await Team.deleteMany({});
    await Player.deleteMany({});
    console.log('Cleared existing data');

    // Seed arenas
    const insertedArenas = await Arena.insertMany(arenas);
    console.log(`Seeded ${insertedArenas.length} arenas`);

    // Build arena map by name
    const arenaMap: Record<string, mongoose.Types.ObjectId> = {};
    insertedArenas.forEach(arena => {
      arenaMap[arena.name] = arena._id as mongoose.Types.ObjectId;
    });

    // Seed teams
    const insertedTeams = await Team.insertMany(getTeams(arenaMap));
    console.log(`Seeded ${insertedTeams.length} teams`);

    // Build team map by name
    const teamMap: Record<string, mongoose.Types.ObjectId> = {};
    insertedTeams.forEach(team => {
      teamMap[team.name] = team._id as mongoose.Types.ObjectId;
    });

    // Seed players
    const allPlayers = [
      ...getCeltics(teamMap),
    ];

    const insertedPlayers = await Player.insertMany(allPlayers);
    console.log(`Seeded ${insertedPlayers.length} players`);

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seed();