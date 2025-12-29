const express = require("express");
const router = express.Router();

const {
  getWhyChooseUs,
  upsertWhyChooseUs,
  deleteWhyChooseCard,
} = require("../controllers/whyChooseUs.controller");

const authMiddleware = require("../middlewares/auth.middleware");

/* Public */
router.get("/", getWhyChooseUs);

/* Admin */
router.post("/", authMiddleware, upsertWhyChooseUs);
router.put("/", authMiddleware, upsertWhyChooseUs);
router.delete("/:key", authMiddleware, deleteWhyChooseCard);

module.exports = router;
