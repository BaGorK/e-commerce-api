import { StatusCodes } from 'http-status-codes';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import BadRequestError from '../errors/bad-request.js';
import NotFoundError from '../errors/not-found.js';
import checkPermissions from '../utils/checkPermissions.js';

const fakeStripeAPI = async ({ amount, currency }) => {
  const client_secret = 'afsfadjadfajglasjgerousdagaflsjdfjals';
  return { client_secret, amount };
};

export const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;

  if (!cartItems || cartItems.length < 1) {
    throw new BadRequestError('No cart items provided');
  }

  if (!tax || !shippingFee) {
    throw new BadRequestError('please provide tax and shipping fee');
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });

    if (!dbProduct) {
      throw new NotFoundError(`No Product with id: ${item.product} found`);
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
    orderItems = [...orderItems, singleOrderItem];

    // calculate subtotal
    subtotal += item.amount * price;
  }

  const total = subtotal + tax + shippingFee;

  const paymentIntent = await fakeStripeAPI({
    amount: total,
    currency: 'usd',
  });

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.userId,
  });

  return res.status(StatusCodes.CREATED).json({
    status: 'success',
    message: 'createOrder successful',
    data: {
      order,
      clientSecret: order.clientSecret,
    },
  });
};

export const getAllOrders = async (req, res) => {
  const orders = await Order.find({});

  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'getAllOrders',
    numOfOrder: orders.length,
    data: {
      orders,
    },
  });
};

export const getSingleOder = async (req, res) => {
  const { id: orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    throw new NotFoundError(`No order with id: ${orderId} found`);
  }

  checkPermissions(req.user, order.user);

  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'getSingleOder',
    data: {
      order,
    },
  });
};

export const getCurrentUserOrders = async (req, res) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'getCurrentUserOrders',
  });
};
export const updateOrder = async (req, res) => {
  const { id: orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    throw new NotFoundError(`No order with id: ${orderId} found`);
  }

  checkPermissions(req.user, order.user);

  order.paymentIntentId = paymentIntentId;
  order.status = 'paid';
  await order.save();

  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'updateOrder',
    data: {
      order,
    },
  });
};
