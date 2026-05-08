export interface ITeamInfo {
  _id: string;
  name: string;
  city: string;
  abbreviation: string;
  colors: string[];
  logo: string;
}

export interface IGame {
  _id: string;
  homeTeam: ITeamInfo;
  awayTeam: ITeamInfo;
  homeScore: number;
  awayScore: number;
  date: string;
  status: 'scheduled' | 'live' | 'final';
  quarter: number;
  clock: string;
  arena: {
    _id: string;
    name: string;
    city: string;
  };
  postseason: boolean;
  sportRadarId: string;
}