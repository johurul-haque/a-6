import { catchAsync } from '@/utils';
import { sendResponse } from '@/utils/send-response';
import * as sellServices from './sell.service';

export const sellProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const data = await sellServices.sell(productId, req.body);

  sendResponse(res, {
    status: 201,
    message: 'Successfully created record',
    data,
  });
});
