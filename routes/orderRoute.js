import express from 'express';
import {
  createOrder,
  getAllOrders,
  getSingleOder,
  updateOrder,
} from '../controllers/orderController.js';
import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authentication.js';

const Router = express.Router();

Router.use(authenticateUser);

Router.route('/')
  .get(authorizePermissions('admin'), getAllOrders)
  .post(createOrder);

Router.route('/:id').patch(updateOrder).get(getSingleOder);

export default Router;
