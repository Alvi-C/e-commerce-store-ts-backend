import { Request, Response } from 'express';
import { OrderServices } from './order.services';

const createOrder = async (req: Request, res: Response) => {
  try {
    // get data from request body
    const newOrder = req.body;
    // call service function to create a new order
    const result = await OrderServices.createOrderIntoDB(newOrder);
    // Check if order creation was successful
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Order not found!',
      });
    }
    // Respond with success if order was created
    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({
      success: false,
      message: 'Order creation failed',
      error: typedError,
    });
  }
};

export const OrderControllers = {
  createOrder,
};
