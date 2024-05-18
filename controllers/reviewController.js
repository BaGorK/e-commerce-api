import { StatusCodes } from 'http-status-codes';
import Review from '../models/reviewModel.js';
import Product from '../models/productModel.js';
import BadRequestError from '../errors/bad-request.js';
import NotFoundError from '../errors/not-found.js';
import checkPermissions from '../utils/checkPermissions.js';

export const createReview = async (req, res) => {
  const { product: productId } = req.body;

  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    throw new NotFoundError(`No product found with id: ${productId}`);
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });

  if (alreadySubmitted) {
    throw new BadRequestError('Already submitted review for this product');
  }

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);

  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'createReview',
    data: {
      review,
    },
  });
};

export const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});

  return res.status(StatusCodes.OK).json({
    status: 'success',
    numOfReviews: reviews.length,
    message: 'getAllReviews',
    data: {
      reviews,
    },
  });
};

export const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new NotFoundError(`No review found with id: ${reviewId}`);
  }

  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'getSingleReview',
    data: {
      review,
    },
  });
};

export const updateReview = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'updateReview',
  });
};

export const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new NotFoundError(`No review found with id: ${reviewId}`);
  }

  checkPermissions(req.user, review.user);
  await review.remove();

  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'deleteReview',
  });
};
