import { Router, Request, Response } from "express";
import Player from "../models/Player";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const players = await Player.find({ jerseyNumber: { $ne: null } }).populate(
      "team",
    );
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const player = await Player.findById(req.params.id).populate("team");
    if (!player) return res.status(404).json({ message: "Player not found" });
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/team/:teamId", async (req: Request, res: Response) => {
  try {
    const players = await Player.find({ team: req.params.teamId }).populate(
      "team",
    );
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
