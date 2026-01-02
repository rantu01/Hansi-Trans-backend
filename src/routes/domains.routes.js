const express = require("express");
const router = express.Router();
const { getDomains, upsertDomain, deleteDomain } = require("../controllers/domains.controller");
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");

// Public route for frontend
router.get("/", getDomains);

// Admin routes
router.post("/", auth, role("admin"), upsertDomain);
router.delete("/:id", auth, role("admin"), deleteDomain);

module.exports = router;