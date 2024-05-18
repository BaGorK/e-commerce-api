import express from 'express';
import {
  createReview,
  deleteReview,
  getAllReviews,
  getSingleReview,
  updateReview,
} from '../controllers/reviewController.js';

const Router = express.Router();

Router.route('/').get(getAllReviews).post(createReview);

Router.route('/:id')
  .get(getSingleReview)
  .patch(updateReview)
  .delete(deleteReview);

export default Router;
