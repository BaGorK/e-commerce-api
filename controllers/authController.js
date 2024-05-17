import { StatusCodes } from 'http-status-codes';
import User from '../models/userModel.js';
import BadRequestError from '../errors/bad-request.js';
import { attachCookiesToResponse, createJWT } from '../utils/tokenUtils.js';

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const isFirstUser = (await User.countDocuments()) === 0;
  const role = isFirstUser ? 'admin' : 'user';

  if (await User.findOne({ email })) {
    throw new BadRequestError('Email already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  const tokenUser = {
    name: user.name,
    userId: user._id,
    role: user.role,
  };

  attachCookiesToResponse({
    res,
    user: tokenUser,
  });

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
