import { Types } from 'mongoose';
import { z } from 'zod';
import { hinge } from './product.interface';

const materials = ['acetate', 'plastic', 'titanium', 'tr-90', 'wood'] as const;

const shapes = ['aviator', 'cat-eye', 'oval', 'rectangular', 'round'] as const;

const genders = ['male', 'female', 'unisex'] as const;


export const productSchema = z.object({
  userId: z.custom<Types.ObjectId>(),
  name: z.string(),
  brand: z.string(),
  price: z.number(),
  quantity: z.number(),
  frame: z.object({
    material: z.string(),
    shape: z.string(),
  }),
  lensType: z.string(),
  color: z.string(),
  gender: z.string(),
  templeLength: z.number(),
  bridgeSize: z.number(),
  hingeType: z.enum(hinge),
});
