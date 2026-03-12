const mongoose = require('mongoose');

const caseStudySchema = new mongoose.Schema({
  title: { type: String, default: "" },
  slug: { type: String, unique: true, sparse: true },
  description: { type: String, default: "" },
  content: { type: String, default: "" },
  image: { type: String, required: true },
  images: [{ type: String }],
  alt: { type: String, default: "Case Study" },
  stats: [{
    label: { type: String, default: "" },
    value: { type: String, default: "" }
  }],
  metaTags: {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    keywords: [{ type: String }],
    ogImage: { type: String, default: "" }
  }
}, { timestamps: true });

module.exports = mongoose.model('CaseStudy', caseStudySchema);