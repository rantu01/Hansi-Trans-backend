const SiteConfig = require("../models/SiteConfig");

/**
 * @desc Get site config (PUBLIC)
 * @route GET /api/site
 */
const getSiteConfig = async (req, res) => {
  try {
    let config = await SiteConfig.findOne();

    // first time init
    if (!config) {
      config = await SiteConfig.create({
        logo: "",
      });
    }

    res.status(200).json({
      success: true,
      data: config,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * @desc Update site config (ADMIN)
 * @route PUT /api/site
 */
const updateSiteConfig = async (req, res) => {
  try {
    const { logo } = req.body;

    let config = await SiteConfig.findOne();

    if (!config) {
      config = new SiteConfig();
    }

    if (logo) config.logo = logo;

    await config.save();

    res.status(200).json({
      success: true,
      message: "Site config updated",
      data: config,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSiteConfig,
  updateSiteConfig,
};
