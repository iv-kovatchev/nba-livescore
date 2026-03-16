import mongoose, { Schema, Document } from 'mongoose';

export interface IGameStats extends Document {
  game: mongoose.Types.ObjectId;
  player: {
    externalId: number;
    firstName: string;
    lastName: string;
    position: string;
    jerseyNumber: string | null;
  };
  team: {
    externalId: number;
    abbreviation: string;
  };
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
}

const GameStatsSchema = new Schema<IGameStats>({
  game: { type: Schema.Types.ObjectId, ref: "Game", required: true },
  player: {
    externalId: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    position: { type: String, default: "" },
    jerseyNumber: { type: String, default: null },
  },
  team: {
    externalId: { type: Number, required: true },
    abbreviation: { type: String, required: true },
  },
  min: { type: String, default: "0" },
  pts: { type: Number, default: 0 },
  reb: { type: Number, default: 0 },
  ast: { type: Number, default: 0 },
  stl: { type: Number, default: 0 },
  blk: { type: Number, default: 0 },
  fgm: { type: Number, default: 0 },
  fga: { type: Number, default: 0 },
  fg3m: { type: Number, default: 0 },
  fg3a: { type: Number, default: 0 },
  ftm: { type: Number, default: 0 },
  fta: { type: Number, default: 0 },
  plus_minus: { type: Number, default: 0 },
});

GameStatsSchema.index({ game: 1, "player.externalId": 1 }, { unique: true });

export default mongoose.model<IGameStats>("GameStats", GameStatsSchema);
