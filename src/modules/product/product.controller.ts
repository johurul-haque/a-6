import { AppError, catchAsync } from '@/utils';
import { sendResponse } from '@/utils/send-response';
import { Query } from './product.interface';
import * as productServices from './product.service';

export const addProduct = catchAsync(async (req, res) => {
  const { _id } = req.jwtPayload;

  const data = await productServices.add(req.body, _id);

  sendResponse(res, {
    status: 201,
    message: 'Product added successfully',
    data,
  });
});

export const getProducts = catchAsync(async (req, res) => {
  const queries = req.query as Query,
    { _id } = req.jwtPayload;

  const data = await productServices.get(queries, _id);

  sendResponse(res, {
    message: 'Product successfully retrieved',
    data,
  });
});

export const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const data = await productServices.update(req.body, productId);

  if (!data) throw new AppError(404, 'Product not found.');

  sendResponse(res, {
    status: 200,
    message: 'Product updated successfully',
    data,
  });
});

export const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await productServices.remove(productId);

  if (!result.deletedCount) throw new AppError(404, 'Product not found.');

  sendResponse(res, {
    status: 200,
    message: 'Product deleted successfully',
    data: null,
  });
});

export const bulkDeleteProducts = catchAsync(async (req, res) => {
  const result = await productServices.bulkDelete(req.body);

  sendResponse(res, {
    status: 200,
    message: `${result.deletedCount} products were deleted successfully!`,
  });
});
