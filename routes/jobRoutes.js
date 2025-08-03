const express = require('express');
const router = express.Router();
const { createJob, getAllJobs } = require('../controllers/jobController');
const auth = require('../middleware/auth');

router.post('/', auth, createJob);
router.get('/', getAllJobs);

module.exports = router;