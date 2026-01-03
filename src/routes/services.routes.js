const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/services.controller');

// ১. মেইন লিস্ট রাউট (এটি স্ট্যাটিক, তাই ওপরে থাকতে পারে)
router.get('/', serviceController.getMainServices);

// ২. সাব-সার্ভিস রাউট (অবশ্যই :slug এর ওপরে থাকতে হবে)
router.get('/sub/:parentSlug', serviceController.getSubServices);

// ৩. সিঙ্গেল সার্ভিস রাউট (এটি সবার নিচে থাকবে কারণ এটি ডাইনামিক প্যারামিটার গ্রহণ করে)
router.get('/:slug', serviceController.getServiceBySlug);

// Admin/Protected Routes
router.post('/add', serviceController.createService);
router.put('/update/:id', serviceController.updateService);
router.delete('/delete/:id', serviceController.deleteService);

module.exports = router;