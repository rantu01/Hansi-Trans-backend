const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
  image: { type: String, required: true },
  alt: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('CaseStudy', caseStudySchema);