import express from 'express';
import { login, logout, register } from '../controllers/authController.js';

const Router = express.Router();

Router.post('/register', register);
Router.post('/login', login);
Router.get('/logout', logout);

export default Router;
