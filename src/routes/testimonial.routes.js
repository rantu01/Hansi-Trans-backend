const express = require("express");
const router = express.Router();

const {
  getTestimonials,
  upsertTestimonials,
  deleteTestimonialItem,
} = require("../controllers/testimonial.controller");

const authMiddleware = require("../middlewares/auth.middleware");

/* Public */
router.get("/", getTestimonials);

/* Admin */
router.post("/", authMiddleware, upsertTestimonials);
router.put("/", authMiddleware, upsertTestimonials);
router.delete("/:id", authMiddleware, deleteTestimonialItem);

module.exports = router;
