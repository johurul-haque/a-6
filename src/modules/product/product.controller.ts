import { AppError, catchAsync } from '@/utils';
import { sendResponse } from '@/utils/send-response';
import * as productServices from './product.service';

export const addProduct = catchAsync(async (req, res) => {
  const data = await productServices.add(req.body);

  sendResponse(res, {
    status: 201,
    message: 'Product added successfully',
    data,
  });
});

export const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const data = await productServices.update(req.body, productId);

  if (!data) throw new AppError(404, 'Product not found');

  sendResponse(res, {
    status: 200,
    message: 'Product updated successfully',
    data,
  });
});

export const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await productServices.deleteProduct(productId);

  if (!result.deletedCount) throw new AppError(404, 'Product not found');

  sendResponse(res, {
    status: 200,
    message: 'Product deleted successfully',
    data: null,
  });
});
