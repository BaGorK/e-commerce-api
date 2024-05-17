import express from 'express';
import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from '../controllers/userController.js';

const Router = express();

Router.route('/').get(getAllUsers);

Router.get('/showMe', showCurrentUser);
Router.post('/updateUser', updateUser);
Router.post('/updateUserPassword', updateUserPassword);

Router.route('/:id').get(getSingleUser);

export default Router;
