import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';
import BadRequestError from '../errors/bad-request.js';

export const register = async (req, res, next) => {
  const { email } = req.body;
  if (User.findOne({ email })) {
    throw BadRequestError('Email already exists');
  }
  const user = await User.create(req.body);

  return res.status(StatusCodes.CREATED).json({
    status: 'success',
    message: 'Register',
    data: { user },
  });
};

export const login = (req, res, next) => {
  return res.status(200).json({ message: 'login' });
};

export const logout = (req, res, next) => {
  return res.status(200).json({ message: 'logout' });
};
