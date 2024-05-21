import ProductModel from './product.model';
import { Product } from './product.types';

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getASingleProductFromDB = async (productId: string) => {
  const result = await ProductModel.findById(productId);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getASingleProductFromDB,
};
