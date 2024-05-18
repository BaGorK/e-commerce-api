import mongoose from 'mongoose';

const ReviewSchema = new mongoose({
  title: {
    type: String,
  },
  comment: {
    type: String,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
  },
});

const Review = mongoose.model('Review', ReviewSchema);

export default Review;
