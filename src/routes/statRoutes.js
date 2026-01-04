// routes/statRoutes.js
const express = require('express');
const router = express.Router();
const statController = require('../controllers/statController');

// Server.js e '/api/common/stats' deya ache, tai ekhane shudhu '/' hobe
router.get('/', statController.getAllStats);
router.post('/', statController.createStat);
router.delete('/:id', statController.deleteStat);
// routes/statRoutes.js
router.put('/:id', statController.updateStat);

module.exports = router;