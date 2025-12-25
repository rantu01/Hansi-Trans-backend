const express = require("express");
const {
  getSiteConfig,
  updateSiteConfig,
} = require("../controllers/site.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

const router = express.Router();

// PUBLIC
router.get("/", getSiteConfig);

// ADMIN ONLY
router.put(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  updateSiteConfig
);

module.exports = router;
