const express = require("express");
const router = express.Router();

const {
  getAboutUs,
  upsertAboutUs,
  deleteGalleryImage,
} = require("../controllers/aboutUs.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload");

/* ========== Public ========== */
router.get("/", getAboutUs);

/* ========== Admin ========== */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  upsertAboutUs
);

router.put(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  upsertAboutUs
);

router.delete(
  "/gallery",
  authMiddleware,
  roleMiddleware("admin"),
  deleteGalleryImage
);

module.exports = router;
