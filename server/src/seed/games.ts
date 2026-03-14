import mongoose from "mongoose";

const getGames = (
  teamMap: Record<string, mongoose.Types.ObjectId>,
  arenaMap: Record<string, mongoose.Types.ObjectId>,
) => {
  const getDate = (offset: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offset);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  const threeDaysAgo = getDate(-3);
  const twoDaysAgo = getDate(-2);
  const yesterday = getDate(-1);
  const today = getDate(0);
  const tomorrow = getDate(1);
  const twoDaysLater = getDate(2);
  const threeDaysLater = getDate(3);

  return [
    // YESTERDAY
    {
      homeTeam: teamMap["Celtics"],
      awayTeam: teamMap["Lakers"],
      homeScore: 112,
      awayScore: 98,
      date: new Date(`${threeDaysAgo}T19:00:00.000Z`),
      status: "final",
      quarter: 4,
      clock: "0:00",
      arena: arenaMap["TD Garden"],
      sportRadarId: "mock-game-y1",
    },
    {
      homeTeam: teamMap["Knicks"],
      awayTeam: teamMap["Warriors"],
      homeScore: 104,
      awayScore: 117,
      date: new Date(`${threeDaysAgo}T21:30:00.000Z`),
      status: "final",
      quarter: 4,
      clock: "0:00",
      arena: arenaMap["Madison Square Garden"],
      sportRadarId: "mock-game-y2",
    },
    {
      homeTeam: teamMap["Suns"],
      awayTeam: teamMap["Nuggets"],
      homeScore: 98,
      awayScore: 103,
      date: new Date(`${threeDaysAgo}T22:00:00.000Z`),
      status: "final",
      quarter: 4,
      clock: "0:00",
      arena: arenaMap["Footprint Center"],
      sportRadarId: "mock-game-y3",
    },

    // TODAY
    {
      homeTeam: teamMap["Heat"],
      awayTeam: teamMap["Bucks"],
      homeScore: 105,
      awayScore: 110,
      date: new Date(`${today}T18:00:00.000Z`),
      status: "final",
      quarter: 4,
      clock: "0:00",
      arena: arenaMap["Kaseya Center"],
      sportRadarId: "mock-game-1",
    },
    {
      homeTeam: teamMap["Knicks"],
      awayTeam: teamMap["Warriors"],
      homeScore: 87,
      awayScore: 91,
      date: new Date(`${today}T19:30:00.000Z`),
      status: "live",
      quarter: 3,
      clock: "4:32",
      arena: arenaMap["Madison Square Garden"],
      sportRadarId: "mock-game-2",
    },
    {
      homeTeam: teamMap["Bulls"],
      awayTeam: teamMap["Nuggets"],
      homeScore: 0,
      awayScore: 0,
      date: new Date(`${today}T22:00:00.000Z`),
      status: "scheduled",
      quarter: 0,
      clock: "",
      arena: arenaMap["United Center"],
      sportRadarId: "mock-game-3",
    },
    {
      homeTeam: teamMap["Celtics"],
      awayTeam: teamMap["Lakers"],
      homeScore: 112,
      awayScore: 98,
      date: new Date(`${today}T19:00:00.000Z`),
      status: "final",
      quarter: 4,
      clock: "0:00",
      arena: arenaMap["TD Garden"],
      sportRadarId: "mock-game-4",
    },
    {
      homeTeam: teamMap["Suns"],
      awayTeam: teamMap["Mavericks"],
      homeScore: 67,
      awayScore: 71,
      date: new Date(`${today}T20:00:00.000Z`),
      status: "live",
      quarter: 2,
      clock: "7:15",
      arena: arenaMap["Footprint Center"],
      sportRadarId: "mock-game-5",
    },
    {
      homeTeam: teamMap["Cavaliers"],
      awayTeam: teamMap["Pacers"],
      homeScore: 0,
      awayScore: 0,
      date: new Date(`${today}T23:00:00.000Z`),
      status: "scheduled",
      quarter: 0,
      clock: "",
      arena: arenaMap["Rocket Mortgage FieldHouse"],
      sportRadarId: "mock-game-6",
    },
    {
      homeTeam: teamMap["Thunder"],
      awayTeam: teamMap["Grizzlies"],
      homeScore: 0,
      awayScore: 0,
      date: new Date(`${today}T23:30:00.000Z`),
      status: "scheduled",
      quarter: 0,
      clock: "",
      arena: arenaMap["Paycom Center"],
      sportRadarId: "mock-game-7",
    },
    {
      homeTeam: teamMap["Timberwolves"],
      awayTeam: teamMap["Clippers"],
      homeScore: 54,
      awayScore: 48,
      date: new Date(`${today}T21:00:00.000Z`),
      status: "live",
      quarter: 2,
      clock: "1:45",
      arena: arenaMap["Target Center"],
      sportRadarId: "mock-game-8",
    },

    // TWO DAYS LATER
    {
      homeTeam: teamMap["Lakers"],
      awayTeam: teamMap["Celtics"],
      homeScore: 0,
      awayScore: 0,
      date: new Date(`${twoDaysLater}T19:00:00.000Z`),
      status: "scheduled",
      quarter: 0,
      clock: "",
      arena: arenaMap["Crypto.com Arena"],
      sportRadarId: "mock-game-t1",
    },
    {
      homeTeam: teamMap["Warriors"],
      awayTeam: teamMap["Knicks"],
      homeScore: 0,
      awayScore: 0,
      date: new Date(`${twoDaysLater}T21:30:00.000Z`),
      status: "scheduled",
      quarter: 0,
      clock: "",
      arena: arenaMap["Chase Center"],
      sportRadarId: "mock-game-t2",
    },
    {
      homeTeam: teamMap["Nuggets"],
      awayTeam: teamMap["Suns"],
      homeScore: 0,
      awayScore: 0,
      date: new Date(`${twoDaysLater}T23:00:00.000Z`),
      status: "scheduled",
      quarter: 0,
      clock: "",
      arena: arenaMap["Ball Arena"],
      sportRadarId: "mock-game-t3",
    },
  ];
};

export default getGames;
