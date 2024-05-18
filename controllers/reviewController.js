import { StatusCodes } from 'http-status-codes';

export const getAllReviews = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    message: 'getAllReviews',
  });
};

export const getSingleReview = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    message: 'getSingleReview',
  });
};

export const updateReview = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    message: 'updateReview',
  });
};

export const deleteReview = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    message: 'deleteReview',
  });
};
