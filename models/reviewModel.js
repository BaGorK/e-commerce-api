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
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  console.log(result);

  try {
    await this.model('Product').findByIdAndUpdate(productId, {
      averageRating: Math.round(result[0]?.averageRating * 10) / 10 || 0,
      numOfReviews: result[0]?.numOfReviews || 0,
    });
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post('save', async function () {
  await this.constructor.calcAverageRating(this.product);
});

ReviewSchema.post('findOneAndDelete', async function (doc) {
  console.log(doc.product, 'post delete');
  await doc.constructor.calcAverageRating(doc.product);
});

const Review = mongoose.model('Review', ReviewSchema);

export default Review;
