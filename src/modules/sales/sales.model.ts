import { Schema, model } from 'mongoose';
import { ProductSale } from './sales.interface';

const productSalesModelSchema = new Schema<ProductSale>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    buyer_name: {
      type: String,
      required: true,
    },
    quantity_sold: {
      type: Number,
      required: true,
    },
    total_sale: {
      type: Number,
      required: true,
    },
    sold_on: {
      type: String,
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    date_info: {
      day: { type: Number, required: true },
      week_of_year: { type: Number, required: true },
      month: { type: String, required: true },
      year: { type: Number, required: true },
    },
  },
  {
    toJSON: {
      transform: (doc, { __v, ...rest }) => rest,
    },
  }
);

export const ProductSalesModel = model('sale', productSalesModelSchema);
