const mongoose = require('mongoose');
const blogCategorySchema = mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    image: {
      type: String,
      required: true
    },
    public_id: {
      type: String,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['active', 'deactive'],
    default: 'active'
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('blog-category', blogCategorySchema);