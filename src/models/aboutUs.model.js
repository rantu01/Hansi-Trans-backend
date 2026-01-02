const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema(
  {
    hero: {
      title: String,
      description: String,
      videoImage: String,
    },

    workWithUs: {
      headline: String,
      buttonText: String,
    },

    company: {
      missionTitle: String,
      missionDescription: String,
      visionTitle: String,
      visionDescription: String,
      images: [String],
    },

    gallery: {
      images: [String],
    },

    ceo: {
      name: String,
      designation: String,
      description: String,
      image: String,
      stats: [
        {
          label: String,
          value: String,
        },
      ],
      socials: {
        twitter: String,
        facebook: String,
        linkedin: String,
      },
    },

    schedule: {
      title: String,
      description: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AboutUs", aboutUsSchema);
