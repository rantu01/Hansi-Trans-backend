const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/caseStudyController');

router.get('/', ctrl.getCaseStudies);
router.post('/add', ctrl.addCaseStudy);
router.put('/:id', ctrl.updateCaseStudy);
router.delete('/:id', ctrl.deleteCaseStudy);

module.exports = router;