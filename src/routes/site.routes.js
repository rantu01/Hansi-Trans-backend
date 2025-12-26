const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");
const {
  getSiteConfig,
  updateSiteConfig,
} = require("../controllers/site.controller");

router.get("/", getSiteConfig);

// 🔥 upload.single("logo") VERY IMPORTANT
router.put("/", upload.single("logo"), updateSiteConfig);

module.exports = router;
