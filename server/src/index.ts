import express from "express";
import cors from "cors";
import dns from "dns";
import dotenv from "dotenv";
import connectDB from "./config/db";
import teamRoutes from "./routes/teamRoutes";
import playerRoutes from "./routes/playerRoutes";
import arenaRoutes from "./routes/arenaRoutes";
import gameRoutes from "./routes/gameRoutes";
import syncRoutes from "./routes/syncRoutes";
import standingRoutes from "./routes/standingsRoutes";
import { startCronJobs, startLiveScoreSync,  } from "./config/cron";

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();
connectDB();

startCronJobs();
startLiveScoreSync();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://victorious-bush-030cd0403.6.azurestaticapps.net",
    ],
  }),
);
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

//routes
app.use("/api/teams", teamRoutes);
app.use("/api/players", playerRoutes);
app.use("/api/arenas", arenaRoutes);
app.use("/api/games", gameRoutes);
app.use("/api/sync", syncRoutes);
app.use("/api/standings", standingRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
