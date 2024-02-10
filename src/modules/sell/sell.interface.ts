import { Types } from 'mongoose';
import { z } from 'zod';
import { productSellSchema } from './sell.validation';

export type ProductSell = z.infer<typeof productSellSchema> & {
  userId: Types.ObjectId;
  productId: Types.ObjectId;
};

export type ProductSellPayload = z.infer<typeof productSellSchema>;
