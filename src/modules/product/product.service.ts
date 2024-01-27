import { Product } from './product.interface';
import { ProductModel } from './product.model';

export function add(payload: Product) {
  return ProductModel.create(payload);
}

export async function update(payload: Partial<Product>, productId: string) {
  const { frame, ...rest } = payload,
    modifiedPayload: Record<string, unknown> = { ...rest };

  if (frame && Object.keys(frame).length) {
    for (const [key, value] of Object.entries(frame)) {
      modifiedPayload[`frame.${key}`] = value;
    }
  }

  return ProductModel.findOneAndUpdate({ _id: productId }, modifiedPayload, {
    returnOriginal: false,
  });
}

export async function deleteProduct(productId: string) {
  return ProductModel.deleteOne({ _id: productId });
}
