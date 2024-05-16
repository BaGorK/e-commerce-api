import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide name'],
    minlength: [3, 'name needs to be at least 8 characters'],
    maxlength: [50, 'name needs to be less than 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'please provide email'],
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
