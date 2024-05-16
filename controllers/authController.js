export const register = (req, res, next) => {
  return res.status(200).json({ message: 'Register' });
};

export const login = (req, res, next) => {
  return res.status(200).json({ message: 'login' });
};

export const logout = (req, res, next) => {
  return res.status(200).json({ message: 'logout' });
};
