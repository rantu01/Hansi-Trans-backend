const mongoose = require("mongoose");

const siteConfigSchema = new mongoose.Schema(
  {
    logo: { type: String, default: "" },
    brandText: { type: String, default: "" },
    footerText: { type: String, default: "" },
    footerAddress: { type: String, default: "" },
    copyrightText: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteConfig", siteConfigSchema);
