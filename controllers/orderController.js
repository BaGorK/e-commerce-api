import { StatusCodes } from 'http-status-codes';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import BadRequestError from '../errors/bad-request.js';
import NotFoundError from '../errors/not-found.js';
import checkPermissions from '../utils/checkPermissions.js';

export const createOrder = async (req, res) => {
  const { item: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError('No cart items provided');
  }

  if (!tax || !shippingFee) {
    throw new BadRequestError('please provide tax and shipping fee');
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.Product });

    if (!dbProduct) {
      throw new NotFoundError(`No Product with id: ${item.Product} found`);
    }

    const { name, price, image, _id } = dbProduct;

    const singleOrderItem = {
      amount: item.amount,
      name,
      price,
      image,
      product: _id,
    };

    // add items to order
    orderItems += item.amount * price;

    // calculate subtotal
    subtotal += item.amount * price;
  }

  console.log(orderItems);
  console.log(subtotal);

  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'createOrder',
  });
};

export const getAllOrders = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'getAllOrders',
  });
};

export const getSingleOder = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'getSingleOder',
  });
};

export const getCurrentUserOrders = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'getCurrentUserOrders',
  });
};
export const updateOrder = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'updateOrder',
  });
};
