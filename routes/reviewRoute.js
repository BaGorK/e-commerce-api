import express from 'express';
import {
  createReview,
  deleteReview,
  getAllReviews,
  getSingleReview,
  updateReview,
} from '../controllers/reviewController.js';
import { authenticateUser } from '../middleware/authentication.js';

const Router = express.Router();

Router.route('/').get(getAllReviews).post(authenticateUser, createReview);

Router.route('/:id')
  .get(getSingleReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview);

export default Router;
