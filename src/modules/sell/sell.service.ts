import { AppError } from '@/utils';
import { startSession } from 'mongoose';
import { ProductModel } from '../product/product.model';
import { ProductSellPayload } from './sell.interface';
import { ProductSellModel } from './sell.model';

export async function sell(productId: string, payload: ProductSellPayload) {
  const product = await ProductModel.findById(productId);

  if (!product) throw new AppError(404, 'Product not found');

  const session = await startSession();

  let data;

  try {
    session.startTransaction();

    await ProductModel.updateOne(
      { _id: productId },
      { quantity: product.quantity - payload.quantity_sold }
    );

    data = await ProductSellModel.create({ productId, ...payload });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }

  return data;
}
