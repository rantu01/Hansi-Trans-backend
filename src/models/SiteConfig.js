const mongoose = require("mongoose");

const siteConfigSchema = new mongoose.Schema(
  {
    logo: { type: String, default: "" },
    brandText: { type: String, default: "HANSI Trans+" },
    footerText: { type: String, default: "Save time. Get Started Now." },
    footerAddress: { type: String, default: "Dhaka, Bangladesh" },
    copyrightText: { type: String, default: "All Rights Reserved." },
    // নতুন ফিল্ডসমূহ
    ctaTitle: { type: String, default: "Ready To Go Global?" },
    ctaImage: { type: String, default: "" },
    ctaDescription: { type: String, default: "Expanding your game into Asian markets..." },
    socialTwitter: { type: String, default: "" },
    socialLinkedin: { type: String, default: "" },
    socialYoutube: { type: String, default: "" },
    socialFacebook: { type: String, default: "" },
    socialGlobe: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteConfig", siteConfigSchema);