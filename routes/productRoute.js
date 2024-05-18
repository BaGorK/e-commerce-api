import express from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  uploadImage,
} from '../controllers/productController.js';
import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authentication.js';

const Router = express.Router();

Router.route('/')
  .get(getAllProduct)
  .post([authenticateUser, authorizePermissions('admin')], createProduct);

Router.post('/uploadImage', uploadImage);

Router.route('/:id')
  .get(getSingleProduct)
  .patch([authenticateUser, authorizePermissions('admin')], updateProduct)
  .delete([authenticateUser, authorizePermissions('admin')], deleteProduct);

export default Router;
