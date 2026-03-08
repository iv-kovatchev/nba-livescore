import mongoose, { Schema, Document } from "mongoose";

export interface ITeam extends Document {
  name: string;
  city: string;
  abbreviation: string;
  conference: "East" | "West";
  division: string;
  colors: string[];
  logo: string;
  arena: mongoose.Types.ObjectId;
  sportRadarId: string;
}

const TeamSchema: Schema = new Schema<ITeam>({
    name: { type: String, required: true },
    city: { type: String, required: true },
    abbreviation: { type: String, required: true },
    conference: { type: String, enum: ["East", "West"], required: true },
    division: { type: String, required: true },
    colors: { type: [String] },
    logo: { type: String },
    arena: { type: Schema.Types.ObjectId, ref: "Arena" },
    sportRadarId: { type: String, required: true }
});

export default mongoose.model<ITeam>('Team', TeamSchema);
