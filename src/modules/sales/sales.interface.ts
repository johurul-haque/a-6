import { Types } from 'mongoose';
import { z } from 'zod';
import { productSaleSchema } from './sales.validation';

export type ProductSale = z.infer<typeof productSaleSchema> & {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
};

export type ProductSalePayload = z.infer<typeof productSaleSchema>;
