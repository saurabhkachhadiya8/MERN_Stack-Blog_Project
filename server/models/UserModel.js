const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  public_id: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'user'],
    default: 'user'
  }
});
module.exports = mongoose.model('user', userSchema);