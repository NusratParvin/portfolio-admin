import mongoose, { Schema, Document } from "mongoose";

// Define the TypeScript interface for your project model
interface IProject extends Document {
  name: string;
  image: string;
  techs: string[];
  liveSite: string;
  githubClient: string;
  githubBackend: string;
  summary: string;
  description: string;
}

// Define the schema
const ProjectSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    techs: { type: [String], required: true },
    liveSite: { type: String, required: true },
    githubClient: { type: String, required: true },
    githubBackend: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

// Export the model
const Project =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default Project;
