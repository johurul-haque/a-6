import { Types } from 'mongoose';
import { z } from 'zod';
import { bulkDeleteSchema, productSchema } from './product.validation';

export const hinge = ['standard', 'spring-loaded', 'flexible'] as const;

export type Product = z.infer<typeof productSchema>;
export type TProductModel = Product & {
  userId: Types.ObjectId;
};

export type BulkDeletePayload = z.infer<typeof bulkDeleteSchema>;

export type Query = Record<string, string | undefined>;
