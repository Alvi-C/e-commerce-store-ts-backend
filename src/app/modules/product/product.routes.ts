import express from 'express';

const productsRouter = express.Router();

productsRouter.route('/products').post();

export default productsRouter;
