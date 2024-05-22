import { Schema, model } from 'mongoose';
import { Order } from './order.types';

const orderSchema = new Schema<Order>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const OrderModel = model('Order', orderSchema);

export default OrderModel;
