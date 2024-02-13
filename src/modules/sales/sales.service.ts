import { AppError } from '@/utils';
import { Types, startSession } from 'mongoose';
import { ProductModel } from '../product/product.model';
import { categorizeByOptions, months } from './sales.constants';
import { ProductSalePayload } from './sales.interface';
import { ProductSalesModel } from './sales.model';
import { getMonthName, getWeeksNumberInMonth } from './sales.utils';

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
      day: new Date(payload.sold_on).getDate(),
      week_in_month: getWeeksNumberInMonth(payload.sold_on),
      month: getMonthName(payload.sold_on),
      year: new Date(payload.sold_on).getFullYear(),
    };

    data = await ProductSalesModel.create({
      userId,
      total_sale: product.price * payload.quantity_sold,
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

export async function salesHistory(
  userId: Types.ObjectId,
  categorizeBy: (typeof categorizeByOptions)[number]
) {
  if (categorizeBy === 'monthly') {
    const data = await ProductSalesModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          'date_info.year': new Date().getFullYear(),
        },
      },
      {
        $group: {
          _id: '$date_info.month',
          total_sales: {
            $sum: '$total_sale',
          },
        },
      },
    ]);

    return data.sort((a, b) => {
      return months.indexOf(a._id) - months.indexOf(b._id);
    });
  }

  if (categorizeBy === 'daily') {
    return ProductSalesModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          'date_info.month': months[new Date().getMonth()],
        },
      },
      {
        $group: {
          _id: '$date_info.day',
          total_sales: {
            $sum: '$total_sale',
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
  }

  if (categorizeBy === 'weekly') {
    return ProductSalesModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
          'date_info.month': months[new Date().getMonth()],
        },
      },
      {
        $group: {
          _id: '$date_info.week_in_month',
          total_sales: {
            $sum: '$total_sale',
          },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
  }

  if (categorizeBy === 'yearly') {
    return ProductSalesModel.aggregate([
      {
        $match: {
          userId: new Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: '$date_info.year',
          total_sales: {
            $sum: '$total_sale',
          },
        },
      },
      { $limit: 12 },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
  }
}