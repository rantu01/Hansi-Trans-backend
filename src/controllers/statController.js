const Stat = require('../models/Stat');

// Get Stats (Filter by category if provided)
exports.getAllStats = async (req, res) => {
  try {
    const { category } = req.query; // URL theke query parameter nibe
    const filter = category ? { category } : {}; // Query thakle filter korbe, na thakle shob nibe
    
    const stats = await Stat.find(filter);
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createStat = async (req, res) => {
  try {
    const newStat = new Stat(req.body);
    const savedStat = await newStat.save();
    res.status(201).json(savedStat);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// controllers/statController.js er sheshe add korun
exports.deleteStat = async (req, res) => {
  try {
    await Stat.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// controllers/statController.js
exports.updateStat = async (req, res) => {
  try {
    const updatedStat = await Stat.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // updated data-ti return korbe
    );
    res.status(200).json(updatedStat);
  } catch (error) {
    res.status(400).json({ message: "Update failed", error: error.message });
  }
};