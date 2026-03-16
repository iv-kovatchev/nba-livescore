export interface IGameDetailTeam {
  _id: string;
  name: string;
  city: string;
  abbreviation: string;
  colors: string[];
}

export interface IGameDetailArena {
  _id: string;
  name: string;
  city: string;
  state: string;
  capacity: number;
}

export interface IGameDetail {
  _id: string;
  homeTeam: IGameDetailTeam;
  awayTeam: IGameDetailTeam;
  homeScore: number;
  awayScore: number;
  date: string;
  status: "scheduled" | "live" | "final";
  quarter: number;
  clock: string;
  arena: IGameDetailArena;
  externalId: number;
  homeQ1: number | null;
  homeQ2: number | null;
  homeQ3: number | null;
  homeQ4: number | null;
  homeOT: number | null;
  awayQ1: number | null;
  awayQ2: number | null;
  awayQ3: number | null;
  awayQ4: number | null;
  awayOT: number | null;
}

export interface IPlayerStat {
  id: number;
  min: string;
  pts: number;
  reb: number;
  ast: number;
  stl: number;
  blk: number;
  fgm: number;
  fga: number;
  fg3m: number;
  fg3a: number;
  ftm: number;
  fta: number;
  plus_minus: number;
  player: {
    externalId: number;
    firstName: string;
    lastName: string;
    position: string;
    jerseyNumber: string | null;
  };
  team: {
    id: number;
    abbreviation: string;
  };
}
