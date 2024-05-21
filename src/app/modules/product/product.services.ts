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

const updateAProductInDB = async (
  productId: string,
  dataToUpdate: Partial<Product>,
) => {
  const result = await ProductModel.findByIdAndUpdate(productId, dataToUpdate, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getASingleProductFromDB,
  updateAProductInDB,
};
