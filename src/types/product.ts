import { productSchema } from '@/schema/add-products-form-schema';
import { z } from 'zod';

export type ProductSchema = z.infer<typeof productSchema>;
export type Product = z.infer<typeof productSchema> & {
  _id: string;
};