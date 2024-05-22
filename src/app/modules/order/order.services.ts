import OrderModel from './order.model';
import { Order } from './order.types';

const createOrderIntoDB = async (order: Order) => {
  const result = await OrderModel.create(order);
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
};
