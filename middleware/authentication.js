import UnauthenticatedError from '../errors/unauthenticated.js';
import UnauthorizedError from '../errors/unauthorized.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = async (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) {
    throw new UnauthenticatedError('Authentication Invalid');
  }

  try {
    const decoded = verifyJWT({ token });
    const { name, userId, role } = decoded;

    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError(
        'you are not authorized to access this route'
      );
    }
    next();
  };
};

// console.log(decoded);
// {
//   name: 'admin',
//   userId: '6646f52d86865d61f6f5625e',
//   role: 'user',
//   iat: 1715932095,
//   exp: 1716018495
// }
