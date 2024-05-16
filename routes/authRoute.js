import express from 'express';
import { login, logout, register } from '../controllers/authController.js';

const Router = express.Router();

Router.post('/register', register);
Router.get('/logout', logout);
Router.post('/login', login);

export default Router;
