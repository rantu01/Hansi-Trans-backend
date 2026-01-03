const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  bgColor: { type: String, default: 'bg-[#e0f2fe]' }, // Default light blue
  features: [{ type: String }],
  
  // SEO & Meta
  metaTitle: { type: String },
  metaDescription: { type: String },

  // For Nested Structure
  parentService: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Service', 
    default: null 
  }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);