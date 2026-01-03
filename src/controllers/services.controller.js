const Service = require('../models/services.model');

// ১. নতুন সার্ভিস বা সাব-সার্ভিস তৈরি
exports.createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ২. সকল মেইন সার্ভিস দেখা (যেগুলোর parentService null)
exports.getMainServices = async (req, res) => {
  try {
    const services = await Service.find({ parentService: null });
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ৩. একটি নির্দিষ্ট সার্ভিসের সব সাব-সার্ভিস দেখা
exports.getSubServices = async (req, res) => {
  try {
    const { parentSlug } = req.params;
    const parent = await Service.findOne({ slug: parentSlug });
    if (!parent) return res.status(404).json({ message: "Parent service not found" });

    const subServices = await Service.find({ parentService: parent._id });
    res.status(200).json({ success: true, parent, subServices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ৪. স্ল্যাগ (Slug) অনুযায়ী সিঙ্গেল ডাটা (সার্ভিস বা সাব-সার্ভিস দুইটাই কাজ করবে)
exports.getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ৫. আপডেট ও ডিলিট
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};