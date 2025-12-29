const express = require("express");
const router = express.Router();

const {
  getWorkProcess,
  upsertWorkProcess,
  deleteStep,
} = require("../controllers/workProcess.controller");

const authMiddleware = require("../middlewares/auth.middleware");

/* Public */
router.get("/", getWorkProcess);

/* Admin */
router.post("/", upsertWorkProcess);
router.put("/",  upsertWorkProcess);
router.delete("/step/:index",  deleteStep);

module.exports = router;
