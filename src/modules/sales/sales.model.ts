import { Schema, model } from 'mongoose';
import { ProductSale } from './sales.interface';

const productSaleModelSchema = new Schema<ProductSale>(
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

export const ProductSaleModel = model('sale', productSaleModelSchema);
