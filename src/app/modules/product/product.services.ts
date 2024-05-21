import ProductModel from './product.model';
import { Product } from './product.types';

const createProductIntoDB = async (product: Product) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductsFromDB = async (searchTerm?: string) => {
  if (searchTerm) {
    const result = await ProductModel.find({
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { category: { $regex: searchTerm, $options: 'i' } },
      ],
    });
    return result;
  }
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

const deleteAProductFromDB = async (productId: string) => {
  const result = await ProductModel.findByIdAndDelete(productId);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getASingleProductFromDB,
  updateAProductInDB,
  deleteAProductFromDB,
};
