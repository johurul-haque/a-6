import { Schema, model } from 'mongoose';
import { ProductSell } from './sell.interface';

const productSellModelSchema = new Schema<ProductSell>(
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
      transform: (doc, { __v, createdAt, updatedAt, ...rest }) => rest,
    },
    timestamps: true,
  }
);

export const ProductSellModel = model('sell', productSellModelSchema);
