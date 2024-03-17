import { productSchema } from '@/schema/products-form-schema';
import { z } from 'zod';

export type ProductSchema = z.infer<typeof productSchema>;
export type Product = Omit<ProductSchema, 'image'> & {
  _id: string;
  imageSrc: string;
};