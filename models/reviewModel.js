import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, 'please provide review title'],
      maxlength: 100,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please provide rating'],
    },
    comment: {
      type: String,
      required: [true, 'Please provide review text'],
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

ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calcAverageRating = async function (productId) {
  console.log(productId);
};

ReviewSchema.post('save', async function () {
  await this.constructor.calcAverageRating(this.product);
});

ReviewSchema.post('findByIdAndDelete', async function () {
  console.log(this.product, 'hello');
  await this.constructor.calcAverageRating(this.product);
});

const Review = mongoose.model('Review', ReviewSchema);

export default Review;
