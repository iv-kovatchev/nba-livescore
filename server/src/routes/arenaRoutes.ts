import { Router, Request, Response } from 'express';
import Arena from '../models/Arena';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const arenas = await Arena.find();
    res.json(arenas);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const arena = await Arena.findById(req.params.id);
    if (!arena) return res.status(404).json({ message: 'Arena not found' });
    res.json(arena);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;