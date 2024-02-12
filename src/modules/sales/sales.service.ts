import { AppError } from '@/utils';
import { Types, startSession } from 'mongoose';
import { ProductModel } from '../product/product.model';
import { ProductSalePayload } from './sales.interface';
import { ProductSaleModel } from './sales.model';

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

    data = await ProductSaleModel.create({ userId, ...payload });

    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }

  return data;
}

export async function salesHistory() {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const getMonthName = (monthNum: number) => {
    return months[monthNum - 1];
  };

  return await ProductSaleModel.aggregate([
    {
      $lookup: {
        from: 'products', // collection name of the product model
        localField: 'productId',
        foreignField: '_id',
        as: 'product',
      },
    },
    {
      $unwind: '$product', // Unwind the product array since $lookup outputs an array
    },
    {
      $addFields: {
        month: { $month: { $toDate: '$createdAt' } },
        totalPrice: { $multiply: ['$quantity_sold', '$product.price'] },
      },
    },
    {
      $group: {
        _id: '$month',
        sales_in: { $first: '$month' },
        total: { $sum: '$totalPrice' },
      },
    },
    {
      $project: {
        _id: 0,
        sales_in: {
          $let: {
            vars: { monthIndex: { $subtract: ['$sales_in', 1] } },
            in: {
              $arrayElemAt: [months, '$$monthIndex'],
            },
          },
        },
        total: 1,
      },
    },
  ]);
}