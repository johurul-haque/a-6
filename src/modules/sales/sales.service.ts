import { AppError } from '@/utils';
import { Types, startSession } from 'mongoose';
import { ProductModel } from '../product/product.model';
import { ProductSalePayload } from './sales.interface';
import { ProductSaleModel } from './sales.model';
import { getMonthName, getWeekOfYear } from './sales.utils';

export async function sell(
  userId: Types.ObjectId,
  payload: ProductSalePayload
) {
  const product = await ProductModel.findById(payload.productId);

  if (!product) throw new AppError(404, 'Product not found');

  const remainingQuantity = product.quantity - payload.quantity_sold;

  let data;
  const session = await startSession();

  try {
    session.startTransaction();

    await ProductModel.updateOne(
      { _id: product._id },
      { quantity: remainingQuantity < 0 ? 0 : remainingQuantity }
    );

    const dateInfo = {
      day: payload.sold_on.split('-')[2],
      week_of_year: getWeekOfYear(payload.sold_on),
      month: getMonthName(payload.sold_on),
      year: payload.sold_on.split('-')[0],
    };

    data = await ProductSaleModel.create({
      userId,
      ...payload,
      date_info: dateInfo,
    });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }

  return data;
}

export async function salesHistory() {}