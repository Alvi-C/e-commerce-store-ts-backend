import { Request, Response } from 'express';
import { ProductServices } from './product.services';

const createProduct = async (req: Request, res: Response) => {
  try {
    // get data from request body
    const newProduct = req.body;
    // call service function to create a new product
    const result = await ProductServices.createProductIntoDB(newProduct);
    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({
      success: false,
      message: 'Route not found',
      error: typedError,
    });
  }
};

const getAllProducts = async (req: Request, res: Response) => {
  try {
    // call service function to get all products
    const result = await ProductServices.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({
      success: false,
      message: 'Route not found',
      error: typedError,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
};
