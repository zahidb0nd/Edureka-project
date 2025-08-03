const Application = require('../models/Application');
const Job = require('../models/Job');

exports.applyToJob = async (req, res) => {
  if (req.user.role !== 'job_seeker') {
    return res.status(403).json({ msg: 'Only job seekers can apply' });
  }
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ msg: 'Job not found' });
    }
    const newApplication = new Application({ job: req.params.jobId, jobSeeker: req.user.id });
    await newApplication.save();
    res.json({ msg: 'Application successful' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getApplicationsForJob = async (req, res) => {
  if (req.user.role !== 'employer') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  try {
    const applications = await Application.find({ job: req.params.jobId }).populate('jobSeeker', ['name', 'email']);
    res.json(applications);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};