import { StatusCodes } from 'http-status-codes';
import NotFoundError from '../errors/not-found.js';
import Review from '../models/reviewModel.js';
import BadRequestError from '../errors/bad-request.js';

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
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'getAllReviews',
  });
};

export const getSingleReview = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'getSingleReview',
  });
};

export const updateReview = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'updateReview',
  });
};

export const deleteReview = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'deleteReview',
  });
};
