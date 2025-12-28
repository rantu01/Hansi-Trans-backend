const OurInfluencer = require("../models/OurInfluencer");

/**
 * PUBLIC – Frontend
 * GET /api/our-influencers
 */
exports.getInfluencers = async (req, res) => {
  try {
    const influencers = await OurInfluencer.find().sort({ createdAt: -1 });
    res.json(influencers);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * ADMIN – Create
 * POST /api/our-influencers
 */
exports.createInfluencer = async (req, res) => {
  try {
    const { name, role } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const influencer = await OurInfluencer.create({
      name,
      role,
      image: req.file.path, // cloudinary url
    });

    res.status(201).json(influencer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * ADMIN – Update
 * PUT /api/our-influencers/:id
 */
exports.updateInfluencer = async (req, res) => {
  try {
    const influencer = await OurInfluencer.findById(req.params.id);

    if (!influencer) {
      return res.status(404).json({ message: "Influencer not found" });
    }

    influencer.name = req.body.name || influencer.name;
    influencer.role = req.body.role || influencer.role;

    if (req.file) {
      influencer.image = req.file.path;
    }

    await influencer.save();
    res.json(influencer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * ADMIN – Delete
 * DELETE /api/our-influencers/:id
 */
exports.deleteInfluencer = async (req, res) => {
  try {
    const influencer = await OurInfluencer.findByIdAndDelete(req.params.id);

    if (!influencer) {
      return res.status(404).json({ message: "Influencer not found" });
    }

    res.json({ message: "Influencer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
