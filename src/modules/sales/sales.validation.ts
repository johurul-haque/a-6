import { Types } from 'mongoose';
import { z } from 'zod';

export const productSaleSchema = z.object({
  productId: z.custom<Types.ObjectId>(),
  buyer_name: z.string(),
  sold_on: z.string().transform((value) => {
    const date = new Date(value);
    return date.toISOString().split('T')[0];
  }),
  quantity_sold: z.number(),
});

export const objectId = z.custom<Types.ObjectId>();
