import { z } from 'zod';

export const sellingFormSchema = z.object({
  buyer_name: z.string(),
  sold_on: z.string(),
  quantity_sold: z.coerce.number(),
});
