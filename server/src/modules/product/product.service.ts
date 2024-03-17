import { Types } from 'mongoose';
import { TJwtPayload } from '../user/user.interface';
import { BulkDeletePayload, Product, Query } from './product.interface';
import { ProductModel } from './product.model';
import { queryBuilder } from './product.utils';

export function add(payload: Product, userId: Types.ObjectId) {
  return ProductModel.create({ userId, ...payload });
}

export function get(query: Query, jwtPayload: TJwtPayload) {
  const { pipelines } = queryBuilder(query);

  if (jwtPayload.role === 'user') {
    pipelines.unshift({
      $match: {
        userId: new Types.ObjectId(jwtPayload._id),
      },
    });
  }

  return ProductModel.aggregate([
    {
      $match: {
        quantity: {
          $gt: 0,
        },
      },
    },
    ...pipelines,
  ])
    .project({ __v: 0, userId: 0 })
    .sort({ createdAt: -1 });
}

export async function update(
  jwtPayload: TJwtPayload,
  productId: string,
  payload: Partial<Product>
) {
  const { frame, ...rest } = payload,
    modifiedPayload: Record<string, unknown> = { ...rest };

  if (frame && Object.keys(frame).length) {
    for (const [key, value] of Object.entries(frame)) {
      modifiedPayload[`frame.${key}`] = value;
    }
  }

  let filter: Record<string, unknown> = { _id: productId };

  if (jwtPayload.role === 'user') {
    filter.userId = jwtPayload._id;
  }

  return ProductModel.findOneAndUpdate(filter, modifiedPayload, {
    returnOriginal: false,
  });
}

export async function remove(productId: string, jwtPayload: TJwtPayload) {
  let filter: Record<string, unknown> = { _id: productId };

  if (jwtPayload.role === 'user') {
    filter.userId = jwtPayload._id;
  }

  return ProductModel.deleteOne(filter);
}

export async function bulkDelete(
  payload: BulkDeletePayload,
  jwtPayload: TJwtPayload
) {
  let filter: Record<string, unknown> = { _id: { $in: payload.productIds } };

  if (jwtPayload.role === 'user') {
    filter.userId = jwtPayload._id;
  }

  return ProductModel.deleteMany(filter);
}
