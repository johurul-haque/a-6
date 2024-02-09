import { z } from 'zod';

export const productSellSchema = z.object({
  buyer_name: z.string(),
  sold_on: z.string(),
  quantity_sold: z.number(),
});
