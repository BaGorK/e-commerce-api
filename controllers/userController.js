import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';
import NotFoundError from '../errors/not-found.js';
import BadRequestError from '../errors/bad-request.js';
import UnauthenticatedError from '../errors/unauthenticated.js';
import { attachCookiesToResponse } from '../utils/tokenUtils.js';
import checkPermissions from '../utils/checkPermissions.js';

export const getAllUsers = async (req, res, next) => {
  const users = await User.find({ role: 'user' }).select('-password');
  console.log(req.user);

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
  const user = await User.findOne({ _id: req.params.id }).select('-password');

  if (!user) throw new NotFoundError(`No user found with id: ${req.params.id}`);

  checkPermissions(req.user, user._id);

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
    data: {
      user: req.user,
    },
  });
};

// update user with findOneAndUpdate() does not execute the pre save hook
export const updateUser = async (req, res, next) => {
  const { email, name } = req.body;

  if (!email || !name) {
    throw new BadRequestError('please provide all values');
  }

  // const user = await User.findOneAndUpdate(
  //   { _id: req.user.userId },
  //   { email, name },
  //   {
  //     new: true,
  //     runValidators: true,
  //   }
  // );

  const user = await User.findOne({ _id: req.user.userId });
  user.email = email;
  user.name = name;

  await user.save();

  attachCookiesToResponse({
    res,
    user: { name: user.name, userId: user._id, role: user.role },
  });

  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'successful! update users',
    data: {
      user,
    },
  });
};

export const updateUserPassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new BadRequestError('Please provide both values');
  }
  const user = await User.findOne({ _id: req.user.userId });

  const isPasswordCorrect = await user.comparePassword(oldPassword);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  user.password = newPassword;
  await user.save();

  return res.status(StatusCodes.OK).json({
    status: 'success',
    message: 'Success! Password updated',
  });
};
