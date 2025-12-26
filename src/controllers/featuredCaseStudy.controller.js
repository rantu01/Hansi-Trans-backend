const FeaturedCaseStudy = require("../models/FeaturedCaseStudy");

/**
 * PUBLIC – Get all case studies
 * GET /api/common/featured-case-studies
 */
exports.getAll = async (req, res) => {
  try {
    const data = await FeaturedCaseStudy.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * ADMIN – Create
 * POST /api/common/featured-case-studies
 */
exports.create = async (req, res) => {
  try {
    const item = await FeaturedCaseStudy.create(req.body);

    res.json({
      success: true,
      message: "Case study created",
      data: item,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * ADMIN – Update
 * PUT /api/common/featured-case-studies/:id
 */
exports.update = async (req, res) => {
  try {
    const item = await FeaturedCaseStudy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      success: true,
      message: "Case study updated",
      data: item,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * ADMIN – Delete
 * DELETE /api/common/featured-case-studies/:id
 */
exports.remove = async (req, res) => {
  try {
    await FeaturedCaseStudy.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Case study deleted",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
