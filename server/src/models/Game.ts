import mongoose, { Schema, Document } from "mongoose";

export interface IGame extends Document {
  homeTeam: mongoose.Types.ObjectId;
  awayTeam: mongoose.Types.ObjectId;
  homeScore: number;
  awayScore: number;
  date: Date;
  status: "scheduled" | "live" | "final";
  quarter: number;
  clock: string;
  arena: mongoose.Types.ObjectId;
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

const GameSchema = new Schema<IGame>({
  homeTeam: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  awayTeam: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  homeScore: { type: Number, default: 0 },
  awayScore: { type: Number, default: 0 },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["scheduled", "live", "final"],
    default: "scheduled",
  },
  quarter: { type: Number, default: 0 },
  clock: { type: String, default: "" },
  arena: { type: Schema.Types.ObjectId, ref: "Arena" },
  externalId: { type: Number, unique: true, sparse: true },
  homeQ1: { type: Number, default: null },
  homeQ2: { type: Number, default: null },
  homeQ3: { type: Number, default: null },
  homeQ4: { type: Number, default: null },
  homeOT: { type: Number, default: null },
  awayQ1: { type: Number, default: null },
  awayQ2: { type: Number, default: null },
  awayQ3: { type: Number, default: null },
  awayQ4: { type: Number, default: null },
  awayOT: { type: Number, default: null },
});

export default mongoose.model<IGame>("Game", GameSchema);