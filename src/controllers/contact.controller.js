const multer = require("multer");
const ScheduleRequest = require("../models/ScheduleRequest");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 25 * 1024 * 1024 },
});

const normalizeText = (value = "") => value.toString().trim();

const toBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "true" || normalized === "1" || normalized === "on";
  }
  return Boolean(value);
};

exports.uploadScheduleAttachment = upload.single("file");

exports.createScheduleRequest = async (req, res) => {
  try {
    const payload = {
      firstName: normalizeText(req.body.firstName),
      lastName: normalizeText(req.body.lastName),
      email: normalizeText(req.body.email).toLowerCase(),
      company: normalizeText(req.body.company),
      service: normalizeText(req.body.service),
      phone: normalizeText(req.body.phone),
      message: normalizeText(req.body.message),
      agree: toBoolean(req.body.agree),
      nda: toBoolean(req.body.nda),
      attachment: req.file
        ? {
            originalName: req.file.originalname || "",
            mimeType: req.file.mimetype || "",
            size: req.file.size || 0,
          }
        : undefined,
    };

    if (!payload.firstName || !payload.lastName || !payload.email) {
      return res.status(400).json({ success: false, message: "First name, last name, and email are required" });
    }

    if (!payload.agree) {
      return res.status(400).json({ success: false, message: "Privacy policy agreement is required" });
    }

    const created = await ScheduleRequest.create(payload);
    return res.status(201).json({ success: true, message: "Schedule request submitted", data: created });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getScheduleRequests = async (req, res) => {
  try {
    const filter = {};
    if (req.query.status && ["new", "in-progress", "resolved"].includes(req.query.status)) {
      filter.status = req.query.status;
    }

    const items = await ScheduleRequest.find(filter).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateScheduleRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["new", "in-progress", "resolved"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const updated = await ScheduleRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Schedule request not found" });
    }

    return res.status(200).json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteScheduleRequest = async (req, res) => {
  try {
    const deleted = await ScheduleRequest.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Schedule request not found" });
    }

    return res.status(200).json({ success: true, message: "Schedule request deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
