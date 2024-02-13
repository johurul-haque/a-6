import { Types } from 'mongoose';
import { z } from 'zod';
import { months } from './sales.constants';
import { productSaleSchema } from './sales.validation';

export type ProductSale = z.infer<typeof productSaleSchema> & {
  userId: Types.ObjectId;
  total_sale: number;
  date_info: {
    day: number;
    week_of_year: number;
    month: (typeof months)[number];
    year: number;
  };
};

export type ProductSalePayload = z.infer<typeof productSaleSchema>;
