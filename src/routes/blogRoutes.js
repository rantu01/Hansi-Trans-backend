const express = require('express');
const router = express.Router();
const { 
  getAllBlogs, 
  getBlogBySlug, 
  createBlog, 
  updateBlog, 
  deleteBlog 
} = require('../controllers/blogController');

// Public Routes
router.get('/', getAllBlogs);
router.get('/:slug', getBlogBySlug);

// Admin Routes (এগুলো পরে প্রটেক্টেড করতে পারবেন)
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;