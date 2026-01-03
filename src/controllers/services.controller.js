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

// ২. অ্যাডমিন প্যানেলের জন্য সকল সার্ভিস (মেইন + সাব সব একসাথে)
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate('parentService', 'title')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ৩. শুধুমাত্র মেইন সার্ভিস দেখা (ফ্রন্টএন্ড হোমপেজ/লিস্টের জন্য)
exports.getMainServices = async (req, res) => {
  try {
    const services = await Service.find({ parentService: null });
    res.status(200).json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ৪. একটি নির্দিষ্ট মেইন সার্ভিসের সকল সাব-সার্ভিস দেখা
exports.getSubServices = async (req, res) => {
  try {
    const { parentSlug } = req.params;
    const parent = await Service.findOne({ slug: parentSlug });
    if (!parent) return res.status(404).json({ success: false, message: "Parent service not found" });

    const subServices = await Service.find({ parentService: parent._id });
    res.status(200).json({ success: true, parent, subServices });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ৫. স্ল্যাগ (Slug) অনুযায়ী সিঙ্গেল ডাটা (Professional Supports সহ)
exports.getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug })
      .populate('parentService', 'title slug');
    
    if (!service) return res.status(404).json({ success: false, message: "Service not found" });

    // ঐ সার্ভিসের আন্ডারে কোনো সাব-সার্ভিস থাকলে সেগুলোকেও নিয়ে আসা
    const subServices = await Service.find({ parentService: service._id });

    res.status(200).json({ 
      success: true, 
      data: {
        ...service._doc,
        subServices // ফ্রন্টএন্ডে ব্যবহারের জন্য পাঠানো হলো
      } 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ৬. আপডেট করা (Professional Supports আপডেট করা যাবে এর মাধ্যমে)
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// ৭. ডিলিট করা
exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};