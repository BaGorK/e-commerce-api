import mongoose from 'mongoose';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide name'],
    minlength: [3, 'name needs to be at least 8 characters'],
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

const User = mongoose.model('User', UserSchema);

export default User;
