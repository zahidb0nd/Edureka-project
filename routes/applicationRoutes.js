const express = require('express');
const router = express.Router();
const { applyToJob, getApplicationsForJob } = require('../controllers/applicationController');
const auth = require('../middleware/auth');

router.post('/:jobId', auth, applyToJob);
router.get('/:jobId', auth, getApplicationsForJob);

module.exports = router;