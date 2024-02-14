import { Types } from 'mongoose';
import { z } from 'zod';
import { hinge } from './product.interface';

export const productSchema = z.object({
  name: z.string(),
  brand: z.string(),
  price: z.number(),
  quantity: z.number(),
  frame: z.object({
    material: z.string(),
    shape: z.string(),
  }),
  lens_type: z.string(),
  color: z.string(),
  gender: z.string(),
  temple_length: z.number(),
  bridge_size: z.number(),
  hinge_type: z.enum(hinge),
});

export const bulkDeleteSchema = z.object({
  productIds: z.custom<Types.ObjectId>().array(),
});
