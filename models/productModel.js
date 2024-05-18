import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'product name is required'],
      maxlength: [100, 'Product Name can not be more that 100 characters'],
    },
    price: {
      type: Number,
      required: [true, 'product Price is required'],
      default: 0,
    },
    description: {
      type: String,
      required: [true, 'product description is required'],
      maxlength: [
        1000,
        'Product Description can not be more that 1000 characters',
      ],
    },
    image: {
      type: String,
      default: '/uploads/test.jpeg',
    },
    category: {
      type: String,
      required: [true, 'product category is required'],
      enum: ['office', 'kitchen', 'bedroom'],
    },
    company: {
      type: String,
      required: [true, 'company is required'],
      enum: {
        values: ['ikea', 'liddy', 'macros'],
        message: '{VALUE} is not supported',
      },
    },
    colors: {
      type: [String],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;
