import express from 'express';
import { ProductControllers } from './product.controllers';

const productsRouter = express.Router();

productsRouter
  .route('/api/products')
  .post(ProductControllers.createProduct)
  .get(ProductControllers.getAllProducts);

productsRouter
  .route('/api/products/:productId')
  .get(ProductControllers.getASingleProduct)
  .put(ProductControllers.updateProduct)
  .delete(ProductControllers.deleteProduct);

export default productsRouter;
