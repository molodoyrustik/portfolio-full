const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    trim: true,
  },
  groupId: {
    type: String,
    required: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  value: {
    type: Number,
    required: true,
    trim: true,
  },
})

module.exports = mongoose.model('Skill', schema);
