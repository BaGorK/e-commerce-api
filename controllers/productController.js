import { StatusCodes } from 'http-status-codes';

export const getAllProduct = (req, res, next) => {
  return res.status(StatusCodes.Ok).json({
    message: 'getAllProduct',
  });
};

export const createProduct = (req, res, next) => {
  return res.status(StatusCodes.Ok).json({
    message: 'createProduct',
  });
};

export const updateProduct = (req, res, next) => {
  return res.status(StatusCodes.Ok).json({
    message: 'updateProduct',
  });
};

export const deleteProduct = (req, res, next) => {
  return res.status(StatusCodes.Ok).json({
    message: 'deleteProduct',
  });
};

export const uploadImage = (req, res, next) => {
  return res.status(StatusCodes.Ok).json({
    message: 'uploadImage',
  });
};
