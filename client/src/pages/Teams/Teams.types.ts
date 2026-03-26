export interface ITeam {
  _id: string;
  name: string;
  city: string;
  abbreviation: string;
  conference: "East" | "West";
  division: string;
  colors: string[];
  logoUrl: string | null;
  externalId: number;
}