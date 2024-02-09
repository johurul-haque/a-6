import { Schema, model } from 'mongoose';
import { ProductSell } from './sell.interface';

const productSellModelSchema = new Schema<ProductSell>(
  {
    buyer_name: {
      type: String,
      required: true,
    },
    quantity_sold: {
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
  },
  {
    toJSON: {
      transform: (doc, { __v, ...rest }) => rest,
    },
  }
);

export const ProductSellModel = model('sell', productSellModelSchema);
