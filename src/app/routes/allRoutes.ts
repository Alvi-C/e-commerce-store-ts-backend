import express, { Request, Response } from 'express';

const router = express.Router();

// test route
router.get('/test', (req: Request, res: Response) => {
  res.status(200).json({
    message: '🎉🎉 Test route is working! 🎉🎉',
  });
});

export default router;
