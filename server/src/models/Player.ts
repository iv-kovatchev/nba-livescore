import mongoose, { Document, Schema } from "mongoose";

export interface IPlayer extends Document {
  firstName: string;
  lastName: string;
  position: string;
  jerseyNumber: number;
  height: string;
  weight: number;
  birthDate: string;
  nationality: string;
  team: mongoose.Types.ObjectId;
  externalId: number;
  photoUrl: string;
}

const PlayerSchema: Schema = new Schema<IPlayer>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  position: { type: String, default: "" },
  jerseyNumber: { type: Number },
  height: { type: String },
  weight: { type: Number },
  birthDate: { type: String },
  nationality: { type: String },
  team: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  externalId: { type: Number, unique: true, sparse: true },
  photoUrl: { type: String, default: null },
});

export default mongoose.model<IPlayer>("Player", PlayerSchema);