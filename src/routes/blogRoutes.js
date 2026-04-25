const express = require('express');
const router = express.Router();
const { 
  getAllBlogs, 
  getBlogBySlug, 
  createBlog, 
  updateBlog, 
  deleteBlog 
} = require('../controllers/blogController');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');

// Public Routes
router.get('/', getAllBlogs);
router.get('/:slug', getBlogBySlug);

// Admin Routes (Protected)
router.post('/', auth, role('admin'), createBlog);
router.put('/:id', auth, role('admin'), updateBlog);
router.delete('/:id', auth, role('admin'), deleteBlog);

module.exports = router;