const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  value: { type: String, required: true },
  label: { type: String, required: true },
  // Category add kora holo: 'general' ba 'achievement'
  category: { 
    type: String, 
    required: true, 
    enum: ['general', 'achievement'], 
    default: 'general' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Stat', statSchema);