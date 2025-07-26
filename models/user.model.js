const mongoose = require('mongoose');
const { Schema } = mongoose;

/* ─── Subschemas ─────────────────────────────── */

const TechStackSchema = new Schema(
  {
    category: { type: String },  // e.g., "Frontend"
    tech: { type: String },      // e.g., "React, Vue"
  },
  { _id: false }
);

const ExperienceSchema = new Schema(
  {
    company: { type: String },
    role: { type: String },
    year: { type: String }, // e.g., "2022–Present"
  },
  { _id: false }
);

const EducationSchema = new Schema(
  {
    institution: { type: String },
    degree: { type: String },
    year: { type: String },
  },
  { _id: false }
);

/* ─── Main Schema ─────────────────────────────── */

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String }, // allows "+91...", etc.
    address: { type: String },

    password: { type: String, required: true },

    jobTitle: { type: String },
    brief: { type: String },
    description: { type: String },

    image: {
      main: { type: String },
      about: { type: String },
    },

    socialLinks: {
      x: { type: String },
      linkedIn: { type: String },
      github: { type: String },
      instagram: { type: String },
    },

    resume: { type: String }, // path or URL to PDF

    techStack: [TechStackSchema],
    experiences: [ExperienceSchema],
    education: [EducationSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
