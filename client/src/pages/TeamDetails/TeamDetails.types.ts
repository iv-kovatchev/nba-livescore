export interface ITeamDetailsArena {
  _id: string;
  name: string;
  city: string;
  state: string;
  capacity: number;
  yearBuilt: number;
  photoUrl: string | null;
}

export interface ITeamDetails {
  _id: string;
  name: string;
  city: string;
  abbreviation: string;
  conference: "East" | "West";
  division: string;
  colors: string[];
  logo: string | null;
  arena: ITeamDetailsArena;
  externalId: number;
}

export interface ITeamPlayer {
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
}