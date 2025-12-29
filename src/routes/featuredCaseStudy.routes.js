const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

const {
  getAll,
  create,
  update,
  remove,
} = require("../controllers/featuredCaseStudy.controller");

const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

// PUBLIC
router.get("/", getAll);

// ADMIN
router.post("/", auth, role("admin"), upload.single("image"), create);
router.put("/:id", auth, role("admin"), upload.single("image"), update);
router.delete("/:id", auth, role("admin"), remove);

module.exports = router;
