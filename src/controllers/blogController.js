const Blog = require('../models/Blog');

const normalizeSlug = (value = '') =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

// ১. সব ব্লগ পাওয়া (Public & Admin)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ২. সিঙ্গেল ব্লগ পাওয়া (Slug দিয়ে)
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: normalizeSlug(req.params.slug) });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ৩. নতুন ব্লগ তৈরি (Admin)
exports.createBlog = async (req, res) => {
  try {
    const payload = { ...req.body };
    payload.slug = normalizeSlug(payload.slug || payload.title);
    if (!payload.slug) {
      return res.status(400).json({ message: 'Slug or title is required' });
    }    // Ensure sections is an array
    if (!payload.sections) {
      payload.sections = [];
    }    const newBlog = new Blog(payload);
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ৪. ব্লগ আপডেট (Admin)
exports.updateBlog = async (req, res) => {
  try {
    const payload = { ...req.body };
    if (payload.slug) payload.slug = normalizeSlug(payload.slug);    // Ensure sections is an array
    if (!payload.sections) {
      payload.sections = [];
    }    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ৫. ব্লগ ডিলিট (Admin)
exports.deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};