import { z } from 'zod';
import { productSchema } from './product.validation';

export const hinge = ['standard', 'spring-loaded', 'flexible'] as const;

export type Product = z.infer<typeof productSchema>;
