import express from 'express';
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from '../controllers/userController.js';
import { authenticateUser } from '../middleware/authentication.js';

const Router = express();

Router.route('/').get(authenticateUser, getAllUsers);

Router.get('/showMe', showCurrentUser);
Router.patch('/updateUser', updateUser);
Router.patch('/updateUserPassword', updateUserPassword);

Router.route('/:id').get(getSingleUser);

export default Router;
