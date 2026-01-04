const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  getSiteConfig,
  updateSiteConfig,
} = require("../controllers/site.controller");

router.get("/", getSiteConfig);

// একাধিক ইমেজ ফিল্ড (logo এবং ctaImage) হ্যান্ডেল করার জন্য:
router.put(
  "/",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "ctaImage", maxCount: 1 },
  ]),
  updateSiteConfig
);

module.exports = router;