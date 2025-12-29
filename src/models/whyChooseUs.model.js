const mongoose = require("mongoose");

const whyChooseCardSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true, // unique identifier (left, middleTop, middleBottom, right)
  },
  title: String,
  description: String,
  icon: String, // icon name (Gamepad2, Settings, Globe2, Clock)
  badge: String // optional (like 24)
});

const whyChooseUsSchema = new mongoose.Schema(
  {
    cards: [whyChooseCardSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("WhyChooseUs", whyChooseUsSchema);
