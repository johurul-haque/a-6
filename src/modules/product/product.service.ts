import { Types } from 'mongoose';
import { Product, Query } from './product.interface';
import { ProductModel } from './product.model';
import { queryBuilder } from './product.utils';

export function add(payload: Product, userId: Types.ObjectId) {
  return ProductModel.create({ userId, ...payload });
}

export function get(query: Query, userId: Types.ObjectId) {
  const { pipelines } = queryBuilder(query);

  return ProductModel.aggregate([
    {
      $match: {
        userId: new Types.ObjectId(userId),
      },
    },
    ...pipelines,
  ]).project({ __v: 0, userId: 0 });
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

export async function remove(productId: string) {
  return ProductModel.deleteOne({ _id: productId });
}
