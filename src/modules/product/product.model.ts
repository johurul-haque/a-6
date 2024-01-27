import { Schema, model } from 'mongoose';
import { Product, hinge } from './product.interface';

const productModelSchema = new Schema<Product>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  frame: {
    material: { type: String, required: true },
    shape: { type: String, required: true },
  },
  lensType: { type: String, required: true },
  color: { type: String, required: true },
  gender: { type: String, required: true },
  templeLength: { type: Number, required: true },
  bridgeSize: { type: Number, required: true },
  hingeType: { type: String, enum: hinge, required: true },
});

export const ProductModel = model('product', productModelSchema);
