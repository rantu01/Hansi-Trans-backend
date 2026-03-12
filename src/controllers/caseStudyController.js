const CaseStudy = require('../models/CaseStudy');

const normalizeSlug = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

// সব ডেটা পাওয়ার জন্য
exports.getCaseStudies = async (req, res) => {
  try {
    const studies = await CaseStudy.find().sort({ createdAt: -1 });
    res.json(studies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// নতুন স্লাইড অ্যাড করার জন্য (Admin)
exports.addCaseStudy = async (req, res) => {
  const payload = { ...req.body };
  if (!payload.slug && payload.title) {
    payload.slug = normalizeSlug(payload.title);
  }
  const study = new CaseStudy(payload);
  try {
    const newStudy = await study.save();
    res.status(201).json(newStudy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// slug দিয়ে সিঙ্গেল কেস স্টাডি
exports.getCaseStudyBySlug = async (req, res) => {
  try {
    const slug = normalizeSlug(req.params.slug);
    const study = await CaseStudy.findOne({ slug });
    if (!study) {
      return res.status(404).json({ success: false, message: 'Case study not found' });
    }
    res.status(200).json({ success: true, data: study });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// আপডেট (Admin)
exports.updateCaseStudy = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.slug) payload.slug = normalizeSlug(payload.slug);
    const updated = await CaseStudy.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ডিলিট (Admin)
exports.deleteCaseStudy = async (req, res) => {
  try {
    await CaseStudy.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};