import { Request, Response } from 'express';
import { OrderServices } from './order.services';
import orderValidationSchema from './order.validation';
import { z } from 'zod';
import { ProductServices } from '../product/product.services';

//--------> Create a new order <--------
const createOrder = async (req: Request, res: Response) => {
  try {
    // get data from request body
    const newOrder = req.body;

    // data validation using zod
    const zodParsedData = orderValidationSchema.parse(newOrder);

    // Check product availability before creating order
    const productAvailability = await ProductServices.getProductAvailability(
      zodParsedData.productId,
    );

    // Check sufficient product quantity before creating an order
    if (zodParsedData.quantity > productAvailability.quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient product quantity!',
      });
    }

    // call service function to create a new order
    const result = await OrderServices.createOrderIntoDB(zodParsedData);

    // Check if order creation was successful
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Order not found!',
      });
    }

    // update product inventory after successful order creation
    await ProductServices.updateProductInventoryDuringOrder(
      zodParsedData.productId,
      zodParsedData.quantity,
    );

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

//--------> Get all orders <--------
const getAllOrders = async (req: Request, res: Response) => {
  try {
    // call service function to get all orders
    const result = await OrderServices.getAllOrdersFromDB();

    // Check if orders were found
    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Order not found!',
      });
    }

    // Respond with success if orders were found
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({
      success: false,
      message: 'Product fetch failed',
      error: typedError,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
