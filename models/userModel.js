import mongoose from 'mongoose';
import validator from 'validator';
import { comparePasswordUtil, hashPassword } from '../utils/passwordUtils.js';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide name'],
    minlength: [4, 'name needs to be at least 4 characters'],
    maxlength: [50, 'name needs to be less than 50 characters'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email',
    },
  },
  password: {
    type: String,
    required: [true, 'please provide password'],
    minlength: [8, 'password needs to be at least 8 characters'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

UserSchema.pre('save', async function () {
  // console.log(this.modifiedPaths());
  // console.log(this.isModified('name'));

  if (!this.isModified('password')) return;

  this.password = await hashPassword(this.password);
});

UserSchema.methods.comparePassword = async function (candidatePass) {
  return await comparePasswordUtil(candidatePass, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User;
