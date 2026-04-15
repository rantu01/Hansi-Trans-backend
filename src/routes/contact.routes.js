const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");
const {
  uploadScheduleAttachment,
  createScheduleRequest,
  getScheduleRequests,
  updateScheduleRequestStatus,
  deleteScheduleRequest,
} = require("../controllers/contact.controller");

router.post("/schedule", uploadScheduleAttachment, createScheduleRequest);

router.get("/schedule", authMiddleware, roleMiddleware("admin"), getScheduleRequests);
router.patch("/schedule/:id/status", authMiddleware, roleMiddleware("admin"), updateScheduleRequestStatus);
router.delete("/schedule/:id", authMiddleware, roleMiddleware("admin"), deleteScheduleRequest);

module.exports = router;
