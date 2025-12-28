const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const upload = require("../middlewares/upload");

const {
  getInfluencers,
  createInfluencer,
  updateInfluencer,
  deleteInfluencer,
} = require("../controllers/ourInfluencer.controller");

/**
 * PUBLIC
 */
router.get("/", getInfluencers);

/**
 * ADMIN
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  createInfluencer
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  upload.single("image"),
  updateInfluencer
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  deleteInfluencer
);

module.exports = router;
