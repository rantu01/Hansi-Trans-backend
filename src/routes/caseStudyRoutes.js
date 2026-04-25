const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/caseStudyController');
const auth = require('../middlewares/auth.middleware');
const role = require('../middlewares/role.middleware');

// Public Routes
router.get('/', ctrl.getCaseStudies);
router.get('/:slug', ctrl.getCaseStudyBySlug);

// Admin Routes (Protected)
router.post('/add', auth, role('admin'), ctrl.addCaseStudy);
router.put('/:id', auth, role('admin'), ctrl.updateCaseStudy);
router.delete('/:id', auth, role('admin'), ctrl.deleteCaseStudy);

module.exports = router;