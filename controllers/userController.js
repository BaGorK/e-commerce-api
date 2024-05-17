import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';

export const getAllUsers = async (req, res, next) => {
  const users = await User.find({ role: 'user' }).select('-password');

  return res.status(StatusCodes.OK).json({
    status: 'success',
    numOfResults: users.length,
    message: 'get all users',
    data: {
      users,
    },
  });
};
export const getSingleUser = async (req, res, next) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'get one user successfully',
    data: {
      user,
    },
  });
};
export const showCurrentUser = async (req, res, next) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'get current users',
  });
};
export const updateUser = async (req, res, next) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'update users',
  });
};
export const updateUserPassword = async (req, res, next) => {
  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'update user password',
  });
};
