import bcrypt from 'bcryptjs';

export const hashPassword = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(pass, salt);

  return hashedPassword;
};

export const comparePassword = async (pass, hashPass) => {
  const isCorrect = await bcrypt.compare(pass, hashPass);

  return isCorrect;
};
