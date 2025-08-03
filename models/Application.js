const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  jobSeeker: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['applied', 'reviewed', 'accepted', 'rejected'], default: 'applied' }
});

module.exports = mongoose.model('Application', ApplicationSchema);