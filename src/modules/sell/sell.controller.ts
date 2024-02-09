import { catchAsync } from '@/utils';
import { sendResponse } from '@/utils/send-response';
import * as sellServices from './sell.service';
import { productSellSchema } from './sell.validation';

export const sellProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const payload = productSellSchema.parse(req.body);

  const data = await sellServices.sell(productId, payload);

  sendResponse(res, {
    status: 201,
    message: 'Successfully created record',
    data,
  });
});
