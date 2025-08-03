const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: String,
  description: String,
  requirements: String,
  location: String,
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Job', JobSchema);