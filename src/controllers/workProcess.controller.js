const WorkProcess = require("../models/workProcess.model");

/* ================= GET ================= */
exports.getWorkProcess = async (req, res) => {
  try {
    const data = await WorkProcess.findOne().lean();
    // Default হিসেবে tools: [] যোগ করা হয়েছে
    res.json(data || { steps: [], studios: [], tools: [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch work process" });
  }
};

/* ================= UPSERT ================= */
exports.upsertWorkProcess = async (req, res) => {
  try {
    // tools ফিল্ডটি body থেকে নেওয়া হচ্ছে
    let { steps = [], studios = [], tools = [] } = req.body;

    /* 🔥 CLEAN STEPS */
    steps = steps.map(({ _id, ...rest }) => ({
      title: rest.title || "",
      desc: rest.desc || "",
      icon: rest.icon || "",
      topIcon: rest.topIcon || "",
    }));

    /* 🔥 CLEAN STUDIOS */
    studios = studios.map(({ _id, ...rest }) => ({
      code: rest.code || "",
      name: rest.name || "",
      lang: rest.lang || "",
    }));

    /* 🔥 CLEAN TOOLS (নতুন অংশ) */
    tools = tools.map(({ _id, ...rest }) => ({
      name: rest.name || "",
      image: rest.image || "", // টুলের আইকন বা ইমেজ স্টোর করার জন্য
    }));

    let data = await WorkProcess.findOne();

    if (!data) {
      data = await WorkProcess.create({ steps, studios, tools });
    } else {
      data.steps = steps;
      data.studios = studios;
      data.tools = tools; // ডেটা আপডেট করা হচ্ছে
      await data.save();
    }

    res.json(data);
  } catch (err) {
    console.error("UPSERT WorkProcess error:", err);
    res.status(500).json({ message: "Failed to save work process" });
  }
};

/* ================= DELETE STEP ================= */
exports.deleteStep = async (req, res) => {
  try {
    const index = Number(req.params.index);

    const data = await WorkProcess.findOne();
    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }

    if (index < 0 || index >= data.steps.length) {
      return res.status(400).json({ message: "Invalid index" });
    }

    data.steps.splice(index, 1);
    await data.save();

    res.json({ success: true, steps: data.steps });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
};