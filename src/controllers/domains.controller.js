const Domains = require("../models/domains.model");

// @desc    Get all domains
// @route   GET /api/common/domains
exports.getDomains = async (req, res) => {
  try {
    const domains = await Domains.find().sort({ order: 1 });
    res.json(domains);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// @desc    Upsert/Update Domain (Admin only)
exports.upsertDomain = async (req, res) => {
  const { id, title, description, icon, tags, order } = req.body;
  try {
    if (id) {
      const updated = await Domains.findByIdAndUpdate(
        id,
        { title, description, icon, tags, order },
        { new: true }
      );
      return res.json(updated);
    }
    const newDomain = new Domains({ title, description, icon, tags, order });
    await newDomain.save();
    res.status(201).json(newDomain);
  } catch (err) {
    res.status(400).json({ message: "Operation failed", error: err.message });
  }
};

// @desc    Delete Domain
exports.deleteDomain = async (req, res) => {
  try {
    await Domains.findByIdAndDelete(req.params.id);
    res.json({ message: "Domain deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: "Delete failed" });
  }
};