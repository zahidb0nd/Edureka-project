const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  if (req.user.role !== 'employer') {
    return res.status(403).json({ msg: 'Access denied' });
  }
  const { title, description, requirements, location } = req.body;
  try {
    const newJob = new Job({ title, description, requirements, location, employer: req.user.id });
    const job = await newJob.save();
    res.json(job);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate('employer', ['name']);
    res.json(jobs);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};