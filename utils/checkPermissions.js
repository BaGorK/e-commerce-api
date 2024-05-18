import UnauthenticatedError from '../errors/unauthenticated.js';
import UnauthorizedError from '../errors/unauthorized.js';

const checkPermissions = (requestUser, resourceUserId) => {
  // console.log(requestUser);
  // console.log(resourceUserId);
  // console.log(typeof resourceUserId);
  // { name: 'test', userId: '6648d2c201ce0504dfa59800', role: 'user' }
  // new ObjectId('6648d2c801ce0504dfa59804')

  if (requestUser.role === 'admin') return;
  if (requestUser.userId === resourceUserId.toString()) return;

  throw new UnauthorizedError('Not authorized to access this route');
};

export default checkPermissions;
