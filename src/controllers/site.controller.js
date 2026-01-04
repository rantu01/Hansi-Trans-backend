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
 * UPDATE site config (with multi-image upload)
 */
const updateSiteConfig = async (req, res) => {
  try {
    const updateData = { ...req.body };
    let config = await SiteConfig.findOne();
    if (!config) config = new SiteConfig();

    // লোগো এবং CTA ইমেজ ফাইল চেক করা ও সেভ করা
    if (req.files) {
      if (req.files["logo"]) {
        config.logo = req.files["logo"][0].path; // Cloudinary or Local Path
      }
      if (req.files["ctaImage"]) {
        config.ctaImage = req.files["ctaImage"][0].path;
      }
    }

    // বাকি সব টেক্সট ফিল্ড আপডেট করা
    Object.keys(updateData).forEach((key) => {
      config[key] = updateData[key];
    });

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