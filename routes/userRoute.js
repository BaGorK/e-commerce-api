import express from 'express';
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from '../controllers/userController.js';
import {
  authenticateUser,
  authorizePermissions,
} from '../middleware/authentication.js';

const Router = express();

Router.route('/').get(
  authenticateUser,
  authorizePermissions('admin'),
  getAllUsers
);

Router.get('/showMe', showCurrentUser);
Router.patch('/updateUser', updateUser);
Router.patch('/updateUserPassword', updateUserPassword);

Router.route('/:id').get(getSingleUser);

export default Router;
