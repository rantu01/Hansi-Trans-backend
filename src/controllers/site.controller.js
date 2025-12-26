const SiteConfig = require("../models/SiteConfig");

/**
 * GET site config
 */
const getSiteConfig = async (req, res) => {
  try {
    let config = await SiteConfig.findOne();
    if (!config) config = await SiteConfig.create({});
    res.json({ success: true, data: config });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * UPDATE site config (with image upload)
 */
const updateSiteConfig = async (req, res) => {
  try {
    const {
      brandText,
      footerText,
      footerAddress,
      copyrightText,
    } = req.body;

    let config = await SiteConfig.findOne();
    if (!config) config = new SiteConfig();

    // 🔹 If logo uploaded
    if (req.file?.path) {
      config.logo = req.file.path; // cloudinary url
    }

    if (brandText) config.brandText = brandText;
    if (footerText) config.footerText = footerText;
    if (footerAddress) config.footerAddress = footerAddress;
    if (copyrightText) config.copyrightText = copyrightText;

    await config.save();

    res.json({
      success: true,
      message: "Site config updated successfully",
      data: config,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getSiteConfig,
  updateSiteConfig,
};
