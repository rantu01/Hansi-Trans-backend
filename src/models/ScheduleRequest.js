const mongoose = require("mongoose");

const scheduleRequestSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    company: { type: String, default: "", trim: true },
    service: { type: String, default: "", trim: true },
    phone: { type: String, default: "", trim: true },
    message: { type: String, default: "", trim: true },
    agree: { type: Boolean, default: false },
    nda: { type: Boolean, default: false },
    attachment: {
      originalName: { type: String, default: "" },
      mimeType: { type: String, default: "" },
      size: { type: Number, default: 0 },
    },
    status: {
      type: String,
      enum: ["new", "in-progress", "resolved"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ScheduleRequest", scheduleRequestSchema);
