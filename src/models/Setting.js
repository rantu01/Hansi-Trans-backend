const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
  primary: { type: String, default: '#0070c0' },
  secondary: { type: String, default: '#003d66' },
  accent: { type: String, default: '#347fb9' },
  gradient: { type: String, default: '#51a1da' },
});

module.exports = mongoose.model('Setting', SettingSchema);