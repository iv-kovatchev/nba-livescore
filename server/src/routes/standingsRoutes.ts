import { Router, Request, Response } from "express";
import Game from "../models/Game";
import Team from "../models/Team";

const router = Router();

// Memory cache
let cache: { data: any; timestamp: number } | null = null;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

router.get("/", async (req: Request, res: Response) => {
  try {
    // Return cache if fresh
    if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
      return res.json(cache.data);
    }

    // Aggregate home and away records
    const result = await Game.aggregate([
      { $match: { status: "final" } },
      {
        $facet: {
          home: [
            {
              $group: {
                _id: "$homeTeam",
                wins: { $sum: { $cond: [{ $gt: ["$homeScore", "$awayScore"] }, 1, 0] } },
                losses: { $sum: { $cond: [{ $lt: ["$homeScore", "$awayScore"] }, 1, 0] } },
              },
            },
          ],
          away: [
            {
              $group: {
                _id: "$awayTeam",
                wins: { $sum: { $cond: [{ $gt: ["$awayScore", "$homeScore"] }, 1, 0] } },
                losses: { $sum: { $cond: [{ $lt: ["$awayScore", "$homeScore"] }, 1, 0] } },
              },
            },
          ],
        },
      },
    ]);

    const { home, away } = result[0];

    // Merge home + away into a map
    const recordMap: Record<string, { wins: number; losses: number }> = {};

    for (const h of home) {
      const id = h._id.toString();
      recordMap[id] = { wins: h.wins, losses: h.losses };
    }

    for (const a of away) {
      const id = a._id.toString();
      if (recordMap[id]) {
        recordMap[id].wins += a.wins;
        recordMap[id].losses += a.losses;
      } else {
        recordMap[id] = { wins: a.wins, losses: a.losses };
      }
    }

    // Get all teams with populated arena
    const teams = await Team.find().populate("arena");

    // Build standings
    const standings = teams.map((team) => {
      const record = recordMap[team._id.toString()] || { wins: 0, losses: 0 };
      const gamesPlayed = record.wins + record.losses;
      const winPct = gamesPlayed > 0 ? record.wins / gamesPlayed : 0;

      return {
        team: {
          _id: team._id,
          name: team.name,
          city: team.city,
          abbreviation: team.abbreviation,
          conference: team.conference,
          division: team.division,
          colors: team.colors,
        },
        wins: record.wins,
        losses: record.losses,
        winPct: parseFloat(winPct.toFixed(3)),
        gamesPlayed,
      };
    });

    // Sort by conference then wins
    const east = standings
      .filter(s => s.team.conference === "East")
      .sort((a, b) => b.wins - a.wins);

    const west = standings
      .filter(s => s.team.conference === "West")
      .sort((a, b) => b.wins - a.wins);

    const data = { east, west };

    // Save to cache
    cache = { data, timestamp: Date.now() };

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
