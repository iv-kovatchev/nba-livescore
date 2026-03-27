export interface IPlayerTeam {
  _id: string;
  name: string;
  city: string;
  abbreviation: string;
  colors: string[];
}

export interface IPlayer {
  _id: string;
  firstName: string;
  lastName: string;
  position: string;
  jerseyNumber: number | null;
  height: string;
  weight: number;
  birthDate: string;
  nationality: string;
  externalId: number;
  photoUrl: string | null;
  team: IPlayerTeam;
}
