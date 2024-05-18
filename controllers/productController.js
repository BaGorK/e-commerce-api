import { StatusCodes } from 'http-status-codes';
import Product from '../models/productModel.js';
import NotFoundError from '../errors/not-found.js';

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
  const products = await Product.find({});

  return res.status(StatusCodes.OK).json({
    status: 'success',
    numOfProducts: products.length,
    message: 'getAllProduct',
    data: {
      products,
    },
  });
};

export const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError(`No Product found with id: ${productId}`);
  }

  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'getSingleProduct',
    data: {
      product,
    },
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
