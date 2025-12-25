const mongoose = require("mongoose");

const siteConfigSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SiteConfig", siteConfigSchema);
