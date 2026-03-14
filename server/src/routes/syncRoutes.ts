import { Router, Request, Response } from "express";
import { syncGamesByDate } from "../services/syncGames";

const router = Router();

router.get("/games", async (req: Request, res: Response) => {
  try {
    const date =
      (req.query.date as string) || new Date().toISOString().split("T")[0];
    await syncGamesByDate(date);
    res.json({ message: `Synced games for ${date}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sync failed" });
  }
});

export default router;
