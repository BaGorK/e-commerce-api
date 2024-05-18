import { StatusCodes } from 'http-status-codes';

export const createProduct = (req, res, next) => {
  return res.status(StatusCodes.OK).json({
    message: 'createProduct',
  });
};

export const getAllProduct = (req, res, next) => {
  return res.status(StatusCodes.OK).json({
    message: 'getAllProduct',
  });
};

export const getSingleProduct = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    message: 'getSingleProduct',
  });
};

export const updateProduct = (req, res, next) => {
  return res.status(StatusCodes.OK).json({
    message: 'updateProduct',
  });
};

export const deleteProduct = (req, res, next) => {
  return res.status(StatusCodes.OK).json({
    message: 'deleteProduct',
  });
};

export const uploadImage = (req, res, next) => {
  return res.status(StatusCodes.OK).json({
    message: 'uploadImage',
  });
};
