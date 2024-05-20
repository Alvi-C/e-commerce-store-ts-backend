import express, { Request, Response } from 'express';
import productsRouter from '../modules/product/product.routes';

const router = express.Router();

// test route
router.get('/test', (req: Request, res: Response) => {
  res.status(200).json({
    message: '🎉🎉 Test route is working! 🎉🎉',
  });
});

// product route
router.use('/api', productsRouter);

export default router;
