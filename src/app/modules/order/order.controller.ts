import { Request, Response } from 'express';
import { OrderServices } from './order.services';
import orderValidationSchema from './order.validation';
import { z } from 'zod';

const createOrder = async (req: Request, res: Response) => {
  try {
    // get data from request body
    const newOrder = req.body;

    // data validation using zod
    const zodParsedData = orderValidationSchema.parse(newOrder);

    // call service function to create a new order
    const result = await OrderServices.createOrderIntoDB(zodParsedData);
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
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Order creation failed',
        error: typedError,
      });
    }
  }
};

export const OrderControllers = {
  createOrder,
};
