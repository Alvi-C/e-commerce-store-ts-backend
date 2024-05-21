import { Request, Response } from 'express';
import { ProductServices } from './product.services';
import productValidationSchema from './product.validation';
import { z } from 'zod';

//--------> Create a new product <--------
const createProduct = async (req: Request, res: Response) => {
  try {
    // get data from request body
    const newProduct = req.body;

    // data validation using zod
    const zodParsedData = productValidationSchema.parse(newProduct);

    // call service function to create a new product
    const result = await ProductServices.createProductIntoDB(zodParsedData);

    // Check if product creation was successful
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found!',
      });
    }

    // Respond with success if product was created
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

//--------> Get all product <--------
const getAllProducts = async (req: Request, res: Response) => {
  try {
    // get search term from request query param string if it exists
    const searchTerm = req.query?.searchTerm as string;
    // call service function to get all products
    const result = await ProductServices.getAllProductsFromDB(searchTerm);

    // Check if products were found
    if (!result || result.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Product not found!',
      });
    }

    // Respond with success if products were found
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
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

//--------> Get a single product <--------

const getASingleProduct = async (req: Request, res: Response) => {
  try {
    // get product id from request params
    const { productId } = req.params;

    // call service function to get a single product
    const result = await ProductServices.getASingleProductFromDB(productId);

    // Check if the product was found
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found!',
      });
    }

    // Respond with success if the product was found
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
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

//--------> Update a product <--------
const updateProduct = async (req: Request, res: Response) => {
  try {
    // get product id and data from request params and body
    const productId = req.params.productId;
    const dataToUpdate = req.body;

    // Validate update data using Zod with partial schema
    const zodParsedData = productValidationSchema.partial().parse(dataToUpdate);

    // call service function to update the product
    const result = await ProductServices.updateAProductInDB(
      productId,
      zodParsedData,
    );

    // Check if the product update was successful
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Route not found!',
      });
    }

    // Respond with success if the product was updated
    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
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
        message: 'Product update failed',
        error: typedError,
      });
    }
  }
};

//--------> Delete a product <--------
const deleteProduct = async (req: Request, res: Response) => {
  try {
    // get product id from request params
    const productId = req.params.productId;

    // call service function to delete the product
    const result = await ProductServices.deleteAProductFromDB(productId);

    // Check if the product was found and deleted
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found!',
      });
    }

    // Respond with success if the product was deleted
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: null,
    });
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({
      success: false,
      message: 'Product delete operation failed',
      error: typedError,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getASingleProduct,
  updateProduct,
  deleteProduct,
};
