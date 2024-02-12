import { catchAsync } from '@/utils';
import { sendResponse } from '@/utils/send-response';
import * as sellServices from './sales.service';
import { productSaleSchema } from './sales.validation';

export const sellProduct = catchAsync(async (req, res) => {
  const payload = productSaleSchema.parse(req.body);

  const data = await sellServices.sell(req.jwtPayload._id, payload);

  sendResponse(res, {
    status: 201,
    message: 'Successfully created record',
    data,
  });
});

export const getSalesHistory = catchAsync(async (req, res) => {
  const data = await sellServices.salesHistory();

  sendResponse(res, {
    message: 'Successfully created record',
    data,
  });
});