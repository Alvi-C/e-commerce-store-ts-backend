import OrderModel from './order.model';
import { Order } from './order.types';

const createOrderIntoDB = async (order: Order) => {
  const result = await OrderModel.create(order);
  return result;
};

const getAllOrdersFromDB = async (queryEmail?: string) => {
  if (queryEmail) {
    const result = await OrderModel.find({ email: queryEmail });
    return result;
  }
  const result = await OrderModel.find();
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
