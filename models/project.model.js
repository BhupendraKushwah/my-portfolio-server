// models/project.model.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    technologies: { type: [String], default: [] }, // array of strings
    description: { type: String, required: true },
    url: { type: String },
    image: { type: String, required: true },
    addedBy: { type: mongoose.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
