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

const textSectionSchema = new mongoose.Schema(
  {
    title: String,
    text: String,
    points: [String],
    highlight: String,
    image: String,
  },
  { _id: false }
);

const cardSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
  },
  { _id: false }
);

const detailsContentSchema = new mongoose.Schema(
  {
    introduction: {
      title: String,
      text: String,
    },
    sectionOne: textSectionSchema,
    sectionTwo: textSectionSchema,
    richSectionOne: {
      title: String,
      text: String,
      points: [String],
    },
    richSectionTwo: {
      title: String,
      cards: [cardSchema],
    },
    bannerImage: String,
    quoteText: String,
    conclusion: {
      title: String,
      text: String,
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
    detailsContent: detailsContentSchema,
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "FeaturedCaseStudy",
  featuredCaseStudySchema
);
