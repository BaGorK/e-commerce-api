import mongoose from 'mongoose';

const ReviewSchema = new mongoose(
  {
    title: {
      type: String,
    },
    comment: {
      type: String,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model('Review', ReviewSchema);

export default Review;
