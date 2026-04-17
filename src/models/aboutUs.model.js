const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema(
  {
    hero: {
      title: String,
      description: String,
      videoImage: String,
    },

    whoWeAre: {
      badge: String,
      description: String,
      story: String,
      statValue: String,
      statLabel: String,
      image: String,
      avatars: [String],
    },

    coreMission: {
      badge: String,
      title: String,
      description: String,
      decorativeImage: String,
    },

    whatWeBelieve: {
      badge: String,
      title: String,
      cards: [
        {
          title: String,
          description: String,
          iconName: String,
        },
      ],
    },

    workWithUs: {
      headline: String,
      buttonText: String,
      videoUrl: String,
    },

    company: {
      badge: String,
      sectionTitle: String,
      sectionDescription: String,
      missionLabel: String,
      visionLabel: String,
      ctaText: String,
      missionTitle: String,
      missionDescription: String,
      visionTitle: String,
      visionDescription: String,
      images: [String],
    },

    gallery: {
      badge: String,
      title: String,
      description: String,
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
