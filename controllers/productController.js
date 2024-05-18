import { StatusCodes } from 'http-status-codes';
import Product from '../models/productModel.js';

export const createProduct = async (req, res, next) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);

  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'createProduct',
    data: {
      product,
    },
  });
};

export const getAllProduct = async (req, res, next) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'getAllProduct',
  });
};

export const getSingleProduct = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'getSingleProduct',
  });
};

export const updateProduct = async (req, res, next) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'updateProduct',
  });
};

export const deleteProduct = async (req, res, next) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'deleteProduct',
  });
};

export const uploadImage = async (req, res, next) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'uploadImage',
  });
};
