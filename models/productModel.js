import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'product name is required'],
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  company: {
    type: String,
  },
  colors: {
    type: [],
  },
  featured: {
    type: Boolean,
  },
  freeShipping: {
    type: Number,
  },
  inventory: {
    type: Number,
  },
  averageRating: {
    type: Number,
  },
  user: {
    type: String,
  },
});
