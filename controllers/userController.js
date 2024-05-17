export const getAllUsers = async (req, res, next) => {
  return res.status(200).json({
    status: 'success',
    message: 'get all users',
  });
};
export const getSingleUser = async (req, res, next) => {
  return res.status(200).json({
    status: 'success',
    message: 'get one users',
  });
};
export const showCurrentUser = async (req, res, next) => {
  return res.status(200).json({
    status: 'success',
    message: 'get current users',
  });
};
export const updateUser = async (req, res, next) => {
  return res.status(200).json({
    status: 'success',
    message: 'update users',
  });
};
export const updateUserPassword = async (req, res, next) => {
  return res.status(200).json({
    status: 'success',
    message: 'update user password',
  });
};
