const AboutUs = require("../models/aboutUs.model");

/* =======================
   GET (Public)
======================= */
exports.getAboutUs = async (req, res) => {
  try {
    const data = await AboutUs.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch About Us" });
  }
};

/* =======================
   UPSERT (Admin)
======================= */
exports.upsertAboutUs = async (req, res) => {
  try {
    const payload = req.body;

    const updated = await AboutUs.findOneAndUpdate(
      {},
      payload,
      { new: true, upsert: true }
    );

    res.json({
      message: "About Us updated successfully",
      data: updated,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update About Us" });
  }
};

/* =======================
   DELETE GALLERY IMAGE
======================= */
exports.deleteGalleryImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;

    const about = await AboutUs.findOne();
    if (!about) return res.status(404).json({ message: "Data not found" });

    about.gallery.images = about.gallery.images.filter(
      (img) => img !== imageUrl
    );

    await about.save();
    res.json({ message: "Image removed", data: about });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete image" });
  }
};
