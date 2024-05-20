import { Request, Response } from 'express';
import { ProductServices } from './product.services';
import productValidationSchema from './product.validation';
import { z } from 'zod';

const createProduct = async (req: Request, res: Response) => {
  try {
    // get data from request body
    const newProduct = req.body;
    // data validation using zod
    const zodParsedData = productValidationSchema.parse(newProduct);

    // call service function to create a new product
    const result = await ProductServices.createProductIntoDB(zodParsedData);
    res.status(201).json({
      success: true,
      message: 'Product created successfully!',
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
        message: 'Product creation failed',
        error: typedError,
      });
    }
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
