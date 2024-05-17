import jwt from 'jsonwebtoken';

export const createJWT = (user) =>
  jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

export const verifyJWT = ({ token }) =>
  jwt.verify(token, process.env.JWT_SECRET);

export const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT(user);

  res.cookie('token', token, {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });
};
