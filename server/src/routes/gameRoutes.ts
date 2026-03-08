import { Router, Request, Response } from 'express';
import Game from '../models/Game';
import GameStats from '../models/GameStats';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const games = await Game.find()
      .populate('homeTeam')
      .populate('awayTeam')
      .populate('arena');
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/today', async (req: Request, res: Response) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const games = await Game.find({ date: { $gte: start, $lte: end } })
      .populate('homeTeam')
      .populate('awayTeam')
      .populate('arena');
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const game = await Game.findById(req.params.id)
      .populate('homeTeam')
      .populate('awayTeam')
      .populate('arena');
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id/stats', async (req: Request, res: Response) => {
  try {
    const stats = await GameStats.find({ game: req.params.id })
      .populate('player')
      .populate('team');
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
