import mongoose, { Schema, Document } from "mongoose";

export interface IArena extends Document {
  name: string;
  city: string;
  state: string;
  capacity: number;
  yearBuilt: number;
  photoUrl: string | null;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const ArenaSchema: Schema = new Schema<IArena>({
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  capacity: { type: Number, required: true },
  yearBuilt: { type: Number, required: true },
  photoUrl: { type: String },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },
});

export default mongoose.model<IArena>("Arena", ArenaSchema);
