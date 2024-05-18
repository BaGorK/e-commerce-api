import express from 'express';
import { getAllProduct } from '../controllers/productController.js';

const Router = express.Router();

Router.get('/', getAllProduct);

export default Router;
