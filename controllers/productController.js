import { StatusCodes } from 'http-status-codes';
import Product from '../models/productModel.js';
import NotFoundError from '../errors/not-found.js';
import BadRequestError from '../errors/bad-request.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

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

  const product = await Product.findOne({ _id: productId }).populate('reviews');

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
  const { id: productId } = req.params;

  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new NotFoundError(`No Product found with id: ${productId}`);
  }

  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'updateProduct',
    data: {
      product,
    },
  });
};

export const deleteProduct = async (req, res, next) => {
  const { id: productId } = req.params;

  const product = await Product.findOneAndDelete({ _id: productId });

  if (!product) {
    throw new NotFoundError(`No Product found with id: ${productId}`);
  }

  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'deleteProduct',
    data: {
      product,
    },
  });
};

export const uploadImage = async (req, res, next) => {
  if (!req.files) {
    throw new BadRequestError('No File uploaded');
  }

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith('image')) {
    throw new BadRequestError('Please upload Images only');
  }

  const maxSize = 2 * 1024 * 1024;

  if (productImage.size > maxSize) {
    throw new BadRequestError('Please upload Images smaller than 2MB');
  }

  const fileName = `${Date.now()}-${productImage.name}`;

  const imagePath = path.join(__dirname, '../public/uploads/' + `${fileName}`);

  await productImage.mv(imagePath);

  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'uploadImage',
    data: {
      image: `/uploads/${fileName}`,
    },
  });
};
