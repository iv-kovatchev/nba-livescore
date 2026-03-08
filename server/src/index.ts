import express from 'express';
import cors from 'cors';
import dns from 'dns';
import dotenv from 'dotenv';
import connectDB from './config/db';
import teamRoutes from './routes/teamRoutes';
import playerRoutes from './routes/playerRoutes';
import arenaRoutes from './routes/arenaRoutes';
import gameRoutes from './routes/gameRoutes';

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

//routes
app.use('/api/teams', teamRoutes);
app.use('/api/players', playerRoutes);
app.use('/api/arenas', arenaRoutes);
app.use('/api/games', gameRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});