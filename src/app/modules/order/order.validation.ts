import { z } from 'zod';

const orderValidationSchema = z.object({
  email: z.string().trim().min(2, 'Email is required!'),
  productId: z.string().trim().min(5, 'Product ID is required!'),
  price: z.number().positive('Price must be positive number!'),
  quantity: z.number().positive('Quantity must be positive number!'),
});

export default orderValidationSchema;
