import { Schema, model } from 'mongoose';
import { TProductModel, hinge } from './product.interface';

const productModelSchema = new Schema<TProductModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    name: { type: String, required: true },
    imageSrc: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    frame: {
      material: { type: String, required: true },
      shape: { type: String, required: true },
    },
    lens_type: { type: String, required: true },
    color: { type: String, required: true },
    gender: { type: String, required: true },
    temple_length: { type: Number, required: true },
    bridge_size: { type: Number, required: true },
    hinge_type: { type: String, enum: hinge, required: true },
  },
  {
    toJSON: {
      transform: (doc, { __v, userId, ...rest }) => rest,
    },
  }
);

export const ProductModel = model('product', productModelSchema);
