import { productSchema } from '@/schema/add-products-form-schema';
import { z } from 'zod';

export type Product = z.infer<typeof productSchema>;
