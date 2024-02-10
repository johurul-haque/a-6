import { AppError } from '@/utils';
import { Types, startSession } from 'mongoose';
import { ProductModel } from '../product/product.model';
import { ProductSellPayload } from './sell.interface';
import { ProductSellModel } from './sell.model';

export async function sell(
  userId: Types.ObjectId,
  productId: Types.ObjectId,
  payload: ProductSellPayload
) {
  const product = await ProductModel.findById(productId);

  if (!product) throw new AppError(404, 'Product not found');

  const remainingQuantity = product.quantity - payload.quantity_sold;

  let data;
  const session = await startSession();

  try {
    session.startTransaction();

    await ProductModel.updateOne(
      { _id: productId },
      { quantity: remainingQuantity < 0 ? 0 : remainingQuantity }
    );

    data = await ProductSellModel.create({ userId, productId, ...payload });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }

  return data;
}
