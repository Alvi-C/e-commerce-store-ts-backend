import express from 'express';
import { ProductControllers } from './product.controllers';

const productsRouter = express.Router();

productsRouter
  .route('/products')
  .post(ProductControllers.createProduct)
  .get(ProductControllers.getAllProducts);

export default productsRouter;
