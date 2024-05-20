import { z } from 'zod';

const variantValidationSchema = z.object({
  type: z.string().trim().min(1, 'Variant type is required'),
  value: z.string().trim().min(1, 'Variant value is required'),
});

const inventoryValidationSchema = z.object({
  quantity: z.number().positive('Quantity must be positive'),
  inStock: z.boolean(),
});

const productValidationSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(255),
  description: z
    .string()
    .trim()
    .min(10, 'Description must be at least 10 characters'),
  price: z.number().positive('Price must be positive'),
  category: z.string().trim().min(1, 'Category is required'),
  tags: z.array(z.string().trim().min(1, 'Tag cannot be empty')),
  variants: z
    .array(variantValidationSchema)
    .nonempty('Variants cannot be empty'),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
