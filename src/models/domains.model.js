const mongoose = require("mongoose");

const domainsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String }, // কার্ডের টেক্সট
    icon: { type: String }, // Lucide icon name (e.g., "Gamepad2")
    tags: [{ type: String }], // ["Localization", "Digital", etc.]
    order: { type: Number, default: 0 } // সাজানোর সুবিধার্থে
  },
  { timestamps: true }
);

module.exports = mongoose.model("Domains", domainsSchema);