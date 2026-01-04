const CaseStudy = require('../models/CaseStudy');

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
  const study = new CaseStudy(req.body);
  try {
    const newStudy = await study.save();
    res.status(201).json(newStudy);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// আপডেট (Admin)
exports.updateCaseStudy = async (req, res) => {
  try {
    const updated = await CaseStudy.findByIdAndUpdate(req.params.id, req.body, { new: true });
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