import mongoose, { Schema, Document } from "mongoose";

export interface IGame extends Document {
  homeTeam: mongoose.Types.ObjectId;
  awayTeam: mongoose.Types.ObjectId;
  homeScore: number;
  awayScore: number;
  date: Date;
  status: 'scheduled' | 'live' | 'final';
  quarter: number;
  clock: string;
  arena: mongoose.Types.ObjectId;
  sportRadarId: string;
}

const GameSchema = new Schema<IGame>({
  homeTeam: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  awayTeam: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  homeScore: { type: Number, default: 0 },
  awayScore: { type: Number, default: 0 },
  date: { type: Date, required: true },
  status: { type: String, enum: ['scheduled', 'live', 'final'], default: 'scheduled' },
  quarter: { type: Number, default: 0 },
  clock: { type: String, default: '' },
  arena: { type: Schema.Types.ObjectId, ref: 'Arena' },
  sportRadarId: { type: String, required: true }
});

export default mongoose.model<IGame>('Game', GameSchema);
