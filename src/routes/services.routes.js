const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/services.controller');

// ১. অ্যাডমিন প্যানেলের জন্য সব সার্ভিস (এটি এখন সব ডাটা পাঠাবে)
router.get('/', serviceController.getAllServices);

// ২. ওয়েবসাইটের হোমপেজে দেখানোর জন্য শুধুমাত্র মেইন সার্ভিস
router.get('/main/list', serviceController.getMainServices);

// ৩. সাব-সার্ভিস রাউট
router.get('/sub/:parentSlug', serviceController.getSubServices);

// ৪. সিঙ্গেল সার্ভিস স্ল্যাগ অনুযায়ী
router.get('/:slug', serviceController.getServiceBySlug);

// Admin Actions
router.post('/add', serviceController.createService);
router.put('/update/:id', serviceController.updateService);
router.delete('/delete/:id', serviceController.deleteService);

module.exports = router;