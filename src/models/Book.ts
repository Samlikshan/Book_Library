import { Schema, model, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  publishedYear?: number;
  genre?: string;
  stock: number;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    publishedYear: { type: Number },
    genre: { type: String, trim: true },
    stock: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export const Book = model<IBook>("Book", bookSchema);
