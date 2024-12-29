import mongoose from "mongoose";

const aboutMeSchema = new mongoose.Schema({
  aboutMe: { type: String, required: true },
  techs: [{ icon: String, name: String }],
  education: [{ degree: String, institute: String }],
  work: {
    currentStatus: String,
    previous: [
      {
        company: String,
        location: String,
        designation: String,
        techs: [String],
        responsibilities: String,
      },
    ],
  },
  strengths: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.AboutMe ||
  mongoose.model("AboutMe", aboutMeSchema);
