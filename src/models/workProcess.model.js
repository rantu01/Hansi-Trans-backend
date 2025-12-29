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

const workProcessSchema = new mongoose.Schema(
  {
    steps: [stepSchema],
    studios: [studioSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkProcess", workProcessSchema);
