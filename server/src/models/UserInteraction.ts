import mongoose from 'mongoose';

const UserInteractionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  contentType: {
    type: String,
    required: true,
    enum: ['movie', 'series', 'book', 'song']
  },
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Content'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: {
    type: String
  },
  isCompleted: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
UserInteractionSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const UserInteraction = mongoose.model('UserInteraction', UserInteractionSchema);

export default UserInteraction; 