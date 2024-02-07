import {
  GENDERS,
  HINGES,
  MATERIALS,
  SHAPES,
} from '@/constants/product-constants';
import { z } from 'zod';

export const productSchema = z.object({
  name: z.string(),
  brand: z.string(),
  price: z.coerce.number(),
  quantity: z.coerce.number(),
  frame: z.object({
    material: z.enum(MATERIALS),
    shape: z.enum(SHAPES),
  }),
  lens_type: z.string(),
  color: z.string(),
  gender: z.enum(GENDERS),
  temple_length: z.coerce.number(),
  bridge_size: z.coerce.number(),
  hinge_type: z.enum(HINGES),
});
