const mongoose = require("mongoose");

const statSchema = new mongoose.Schema(
  {
    label: String,
    value: String,
    isIcon: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const featuredCaseStudySchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: String,
    description: String,
    image: String,
    tag: String,
    isReverse: {
      type: Boolean,
      default: false,
    },
    stats: [statSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "FeaturedCaseStudy",
  featuredCaseStudySchema
);
