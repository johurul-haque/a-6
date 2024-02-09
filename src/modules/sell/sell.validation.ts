import { z } from 'zod';

export const productSellSchema = z.object({
  buyer_name: z.string(),
  sold_on: z.string().transform((value) => {
    const date = new Date(value);
    return date.toISOString().split('T')[0];
  }),
  quantity_sold: z.number(),
});
