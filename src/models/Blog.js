const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String }, // Hero description এর জন্য
  content: { type: String, required: true }, // Rich text content
  author: { type: String, default: "Hansi Trans Admin" },
  date: { type: String, default: () => new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) },
  image: { type: String, required: true }, // Image URL
  category: { type: String, required: true }, // যেমন: Games, Voice
  filterTag: { type: String, required: true } // ফিল্টারিং এর জন্য
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);