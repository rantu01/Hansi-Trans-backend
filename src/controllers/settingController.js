const Setting = require('../models/Setting');

exports.getSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne();
    if (!settings) settings = await Setting.create({}); // না থাকলে ডিফল্ট ক্রিয়েট হবে
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const settings = await Setting.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};