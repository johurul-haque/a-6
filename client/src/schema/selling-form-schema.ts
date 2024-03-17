import { z } from 'zod';

export const sellingFormSchema = z.object({
  buyer_name: z.string(),
  sold_on: z.date(),
  quantity_sold: z.coerce.number(),
});
