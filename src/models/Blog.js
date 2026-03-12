const mongoose = require('mongoose');

const blogSectionSchema = new mongoose.Schema({
  type: { type: String, enum: ['heading', 'paragraph', 'list', 'quote', 'image', 'highlight'], required: true },
  text: { type: String },
  items: [{ type: String }], // For lists
  src: { type: String }, // For images
}, { _id: false });

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  sections: [blogSectionSchema], // Structured content sections
  author: { type: String, default: "Hansi Trans Admin" },
  date: { type: String, default: () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) },
  image: { type: String, required: true },
  metaTags: {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    keywords: [{ type: String }],
    ogImage: { type: String, default: "" }
  },
  category: { type: String, required: true },
  filterTag: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);