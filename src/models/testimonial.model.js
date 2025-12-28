const mongoose = require("mongoose");

const testimonialItemSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["text", "video"],
    required: true,
  },
  quote: {
    type: String,
    default: "",
  },
  thumbnail: {
    type: String,
    default: "",
  },
  avatar: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "",
  },
});

const testimonialNavSchema = new mongoose.Schema({
  name: String,
  company: String,
});

const testimonialSchema = new mongoose.Schema(
  {
    testimonials: {
      type: [testimonialItemSchema],
      default: [],
    },
    bottomNav: {
      type: [testimonialNavSchema],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
