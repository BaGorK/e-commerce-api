import mongoose from 'mongoose';

const SingleCartItemSchema = mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  amount: { type: Number, required: true },
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
});

const OrderSchema = new mongoose.Schema({
  tax: {
    type: Number,
    required: true,
    _,
  },
  shippingFee: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  cartItem: [SingleCartItemSchema],
  status: {
    type: String,
    enum: ['pending', 'failed', 'paid', 'delivered', 'canceled'],
    default: 'pending',
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  clientSecret: {
    type: String,
    required: true,
  },
  paymentIntentId: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const Order = mongoose.deleteModel('Order', OrderSchema);

export default Order;
