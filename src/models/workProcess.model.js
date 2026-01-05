const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema({
  title: String,
  desc: String,
  icon: String,
  topIcon: String,
});

const studioSchema = new mongoose.Schema({
  code: String,
  name: String,
  lang: String,
});

// New Tool Schema
const toolSchema = new mongoose.Schema({
  name: String,
  image: String, // URL of the tool icon
});

const workProcessSchema = new mongoose.Schema(
  {
    steps: [stepSchema],
    studios: [studioSchema],
    tools: [toolSchema], // Added this
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkProcess", workProcessSchema);