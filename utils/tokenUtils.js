import jwt from 'jsonwebtoken';

export const createJWT = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

export const verifyJWT = (token) => jwt.verify(token, process.env.JWT_SECRET);
