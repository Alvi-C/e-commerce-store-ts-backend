import express from 'express';
import { OrderControllers } from './order.controller';

const orderRouter = express.Router();

orderRouter.route('/api/orders').post(OrderControllers.createOrder);

export default orderRouter;
