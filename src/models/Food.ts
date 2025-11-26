import mongoose, { Document, Model } from "mongoose";

export interface IFood extends Document {
  name: string;
  category: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const foodSchema = new mongoose.Schema<IFood>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    imageUrl: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Food: Model<IFood> =
  mongoose.models.Food || mongoose.model<IFood>("Food", foodSchema);
