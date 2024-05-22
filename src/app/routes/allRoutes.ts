import express, { Request, Response } from 'express';
import productsRouter from '../modules/product/product.routes';
import orderRouter from '../modules/order/order.routes';

const router = express.Router();

// Welcome route
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: '🎉🎉 Welcome to e-commerce store backend! 🎉🎉',
  });
});

// product route
router.use('/', productsRouter);
// order route
router.use('/', orderRouter);

export default router;
