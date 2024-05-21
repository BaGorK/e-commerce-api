import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  tax: {
    type: Number,
    required: true,
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
  cartItem: [],
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
});

const Order = mongoose.deleteModel('Order', OrderSchema);

export default Order;
