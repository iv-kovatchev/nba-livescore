import mongoose, { Schema, Document } from 'mongoose';

export interface IGameStats extends Document {
  game: mongoose.Types.ObjectId;
  player: mongoose.Types.ObjectId;
  team: mongoose.Types.ObjectId;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  minutesPlayed: string;
  fieldGoalsMade: number;
  fieldGoalsAttempted: number;
  threesMade: number;
  threesAttempted: number;
  freeThrowsMade: number;
  freeThrowsAttempted: number;
  plusMinus: number;
}

const GameStatsSchema = new Schema<IGameStats>({
  game: { type: Schema.Types.ObjectId, ref: "Game", required: true },
  player: { type: Schema.Types.ObjectId, ref: "Player", required: true },
  team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  points: { type: Number, default: 0 },
  rebounds: { type: Number, default: 0 },
  assists: { type: Number, default: 0 },
  steals: { type: Number, default: 0 },
  blocks: { type: Number, default: 0 },
  turnovers: { type: Number, default: 0 },
  minutesPlayed: { type: String, default: "0:00" },
  fieldGoalsMade: { type: Number, default: 0 },
  fieldGoalsAttempted: { type: Number, default: 0 },
  threesMade: { type: Number, default: 0 },
  threesAttempted: { type: Number, default: 0 },
  freeThrowsMade: { type: Number, default: 0 },
  freeThrowsAttempted: { type: Number, default: 0 },
  plusMinus: { type: Number, default: 0 },
});

export default mongoose.model<IGameStats>("GameStats", GameStatsSchema);
