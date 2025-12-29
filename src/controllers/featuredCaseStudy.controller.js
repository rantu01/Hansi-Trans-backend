const FeaturedCaseStudy = require("../models/FeaturedCaseStudy");
const cloudinary = require("../config/cloudinary");

// GET all
exports.getAll = async (req, res) => {
  try {
    const data = await FeaturedCaseStudy.find().sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// CREATE
exports.create = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (req.file && req.file.path) payload.image = req.file.path;

    const item = await FeaturedCaseStudy.create(payload);
    res.json({ success: true, message: "Case study created", data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  try {
    const payload = { ...req.body };

    // If new image uploaded, delete old one
    if (req.file && req.file.path) {
      const existing = await FeaturedCaseStudy.findById(req.params.id);
      if (existing && existing.image) {
        // extract public_id from URL
        const publicId = existing.image
          .split("/")
          .slice(-1)[0]
          .split(".")[0];
        await cloudinary.uploader.destroy(`site/${publicId}`);
      }
      payload.image = req.file.path;
    }

    const item = await FeaturedCaseStudy.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true }
    );

    res.json({ success: true, message: "Case study updated", data: item });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE
exports.remove = async (req, res) => {
  try {
    const existing = await FeaturedCaseStudy.findById(req.params.id);
    if (existing && existing.image) {
      // delete image from cloudinary
      const publicId = existing.image
        .split("/")
        .slice(-1)[0]
        .split(".")[0];
      await cloudinary.uploader.destroy(`site/${publicId}`);
    }

    await FeaturedCaseStudy.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Case study deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
