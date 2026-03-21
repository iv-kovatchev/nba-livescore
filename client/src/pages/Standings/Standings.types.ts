export interface IStandingTeam {
  _id: string;
  name: string;
  city: string;
  abbreviation: string;
  conference: string;
  division: string;
  colors: string[];
}

export interface IStandingEntry {
  team: IStandingTeam;
  wins: number;
  losses: number;
  winPct: number;
  gamesPlayed: number;
}

export interface IStandings {
  east: IStandingEntry[];
  west: IStandingEntry[];
}

export type SortKey = "wins" | "losses" | "winPct" | "gamesPlayed" | "name";
export type SortDir = "asc" | "desc";