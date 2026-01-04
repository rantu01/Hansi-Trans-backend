const mongoose = require('mongoose');

const partnerSchema = new mongoose.Schema({
  name: { type: String, required: false }, // Partner-er naam (optional)
  logo: { type: String, required: true }, // Image URL ba path
}, { timestamps: true });

module.exports = mongoose.model('Partner', partnerSchema);