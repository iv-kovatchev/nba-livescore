import { Router, Request, Response } from "express";
import Game from "../models/Game";
import GameStats from "../models/GameStats";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const games = await Game.find()
      .populate("homeTeam")
      .populate("awayTeam")
      .populate("arena");
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/by-date", async (req: Request, res: Response) => {
  try {
    const dateParam = req.query.date as string;
    if (!dateParam)
      return res.status(400).json({ message: "Date is required" });

    // const start = new Date(`${dateParam}T00:00:00.000Z`);
    // const end = new Date(`${dateParam}T23:59:59.999Z`);

    const start = new Date(`${dateParam}T05:00:00.000Z`);
    const end = new Date(`${dateParam}T04:59:59.999Z`);
    end.setDate(end.getDate() + 1);

    const games = await Game.find({ date: { $gte: start, $lte: end } })
      .populate("homeTeam")
      .populate("awayTeam")
      .populate("arena");
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/playoffs", async (req: Request, res: Response) => {
  try {
    const games = await Game.find({ postseason: true })
      .populate("homeTeam")
      .populate("awayTeam")
      .populate("arena")
      .sort({ date: 1 });
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/playoffs/series", async (req: Request, res: Response) => {
  try {
    const games = await Game.find({ postseason: true })
      .populate("homeTeam")
      .populate("awayTeam")
      .sort({ date: 1 });

    // Group games by series (pair of teams)
    const seriesMap = new Map<string, any>();

    for (const game of games) {
      const home = game.homeTeam as any;
      const away = game.awayTeam as any;

      // Create consistent key regardless of home/away
      const ids = [home._id.toString(), away._id.toString()].sort();
      const key = ids.join("-");

      if (!seriesMap.has(key)) {
        const team1 = home._id.toString() === ids[0] ? home : away;
        const team2 = home._id.toString() === ids[0] ? away : home;

        seriesMap.set(key, {
          team1,
          team2,
          team1Wins: 0,
          team2Wins: 0,
          games: [],
        });
      }

      const series = seriesMap.get(key);
      series.games.push(game);

      if (game.status === "final") {
        const homeWon = game.homeScore > game.awayScore;
        if (homeWon) {
          if (home._id.toString() === ids[0]) series.team1Wins++;
          else series.team2Wins++;
        } else {
          if (away._id.toString() === ids[0]) series.team1Wins++;
          else series.team2Wins++;
        }
      }
    }

    const series = Array.from(seriesMap.values());
    res.json(series);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id/stats", async (req: Request, res: Response) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: "Game not found" });

    // For final games check cache first
    if (game.status === "final") {
      const cached = await GameStats.find({ game: game._id });
      if (cached.length > 0) {
        return res.json(cached);
      }
    }

    // Fetch from balldontlie
    if (!game.externalId) return res.json([]);

    const apiKey = process.env.BALLDONTLIE_API_KEY;
    const bdlRes = await fetch(
      `https://api.balldontlie.io/nba/v1/stats?game_ids[]=${game.externalId}&per_page=100`,
      { headers: { Authorization: apiKey as string } },
    );

    if (!bdlRes.ok) return res.json([]);

    const json = await bdlRes.json();
    const rawStats = json.data;

    if (!rawStats || rawStats.length === 0) return res.json([]);

    // For final games save to MongoDB
    if (game.status === "final") {
      await GameStats.deleteMany({ game: game._id });

      const docs = rawStats.map((s: any) => ({
        game: game._id,
        player: {
          externalId: s.player.id,
          firstName: s.player.first_name,
          lastName: s.player.last_name,
          position: s.player.position,
          jerseyNumber: s.player.jersey_number,
        },
        team: {
          externalId: s.team.id,
          abbreviation: s.team.abbreviation,
        },
        min: s.min,
        pts: s.pts,
        reb: s.reb,
        ast: s.ast,
        stl: s.stl,
        blk: s.blk,
        fgm: s.fgm,
        fga: s.fga,
        fg3m: s.fg3m,
        fg3a: s.fg3a,
        ftm: s.ftm,
        fta: s.fta,
        plus_minus: s.plus_minus,
      }));

      await GameStats.insertMany(docs);
      const saved = await GameStats.find({ game: game._id });
      return res.json(saved);
    }

    // For live games return directly without saving
    return res.json(rawStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const game = await Game.findById(req.params.id)
      .populate("homeTeam")
      .populate("awayTeam")
      .populate("arena");
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
