const mongoose = require('mongoose');

// const SkillSchema = require('./SkillSchema');

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  }
})


module.exports = mongoose.model('SkillGroup', schema);
