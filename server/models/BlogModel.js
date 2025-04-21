const mongoose = require('mongoose');
const blogSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'blog-category',
    required: true
  },
  thumbnail: {
    image: {
      type: String,
      required: true
    },
    public_id: {
      type: String,
      required: true
    }
  },
  views: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  ],
  dislikes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true
    }
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
      },
      text: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  status: {
    type: String,
    enum: ['published', 'draft', 'archived'],
    default: 'draft'
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('blog', blogSchema);