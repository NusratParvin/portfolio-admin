import mongoose, { Document, Schema, Model } from "mongoose";

// Define the Blog interface
interface IBlog extends Document {
  name: string;
  image: string;
  stack: string[];
  details: string;
}

// Define the Blog schema
const BlogSchema: Schema<IBlog> = new Schema(
  {
    name: { type: String },
    image: { type: String },
    stack: { type: [String], default: [] },
    details: { type: String },
  },
  { timestamps: true }
);

// Define the Blog model with proper TypeScript typing
const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);

export default Blog;
