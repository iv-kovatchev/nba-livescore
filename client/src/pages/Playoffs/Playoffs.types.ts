export interface IPlayoffTeam {
  _id: string;
  name: string;
  city: string;
  abbreviation: string;
  conference: string;
  colors: string[];
  logo: string | null;
}

export interface IPlayoffGame {
  _id: string;
  homeTeam: IPlayoffTeam;
  awayTeam: IPlayoffTeam;
  homeScore: number;
  awayScore: number;
  status: 'scheduled' | 'live' | 'final';
  date: string;
  quarter: number;
  clock: string;
}

export interface IPlayoffSeries {
  team1: IPlayoffTeam;
  team2: IPlayoffTeam;
  team1Wins: number;
  team2Wins: number;
  games: IPlayoffGame[];
}